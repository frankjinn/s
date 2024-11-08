import json
class CoverageChecker:
    def __init__(self, policy, user_info):
        self.policy = policy['Policy']
        self.user_info = user_info
        self.benefit_overview = self.policy['BenefitOverview']
        self.categories = self.policy['Categories']
        
    def check_coverage(self, category, cost):
        service_type = self._find_service_type(category)
        if not service_type:
            return f"{category} is not covered under any service type."

        category_details = self.categories[service_type][category]
        
        # Basic coverage information with cost calculations
        coverage_info = {
            "User": self.user_info['Name'],
            "Original Cost": cost
        }

        # Calculate in-network (PF) and out-of-network (Out) coverage
        out_coverage = self._calculate_coverage(category_details, cost, "Out")
        pf_coverage = self._calculate_coverage(category_details, cost, "PF")

        # Combine the results
        coverage_info["OutNetworkCoverage"] = out_coverage
        coverage_info["InNetworkCoverage"] = pf_coverage
        
        return coverage_info

    def _find_service_type(self, category):
        for service_type, categories in self.categories.items():
            if category in categories:
                return service_type
        return None

    def _calculate_coverage(self, category_details, cost, network_type):
        deductible = self.benefit_overview.get(f"Deductible{network_type}", 0)
        coinsurance = self.benefit_overview.get(f"Coinsurance{network_type}Percent", 1)

        coverage_code = category_details.get(network_type)
        if coverage_code == "AD":
            discounted_cost = max(0, cost - deductible) * coinsurance
            return {
                "CoverageType": "After Deductible",
                "Discount": cost - discounted_cost,
                "To Pay": discounted_cost
            }
        elif coverage_code == "PAD":
            percent_after_deductible = category_details.get(f"{network_type}Percent", coinsurance)
            discounted_cost = max(0, cost - deductible) * percent_after_deductible
            return {
                "CoverageType": "Percent After Deductible",
                "Discount": cost - discounted_cost,
                "To Pay": discounted_cost
            }
        elif coverage_code == "CP":
            copay = category_details.get(f"{network_type}CP", 0)
            return {
                "CoverageType": "Copay",
                "Discount": cost - copay,
                "To Pay": copay
            }
        elif coverage_code == "PS":
            return {
                "CoverageType": "Paid as any other sickness",
                "Discount": cost,
                "To Pay": 0
            }
        elif coverage_code == "None":
            return {
                "CoverageType": "No coverage",
                "Discount": 0,
                "To Pay": cost
            }
        else:
            return {
                "CoverageType": f"{coverage_code} coverage",
                "Discount": 0,
                "To Pay": cost
            }

# # Load the policy and user databases
# with open("../examplePolicy.json", "r") as file:
#     policy_database = json.load(file)

# with open("../exampleUser.json", "r") as file:
#     user_database = json.load(file)


# member_id = "8492731"   
# procedure = 'Surgery'
# procedure_cost = 10000

# user_info = next((user for user in user_database if user["MemberID"] == member_id), None)
# if not user_info:
#     raise ValueError(f"User with MemberID {member_id} not found.")

# policy_num = user_info["PolicyNum"]
# if policy_database.get("PolicyNumber") != policy_num:
#     raise ValueError(f"Policy with PolicyNum {policy_num} not found for user {user_info['Name']}.")

# coverage_checker = CoverageChecker(policy_database, user_info)
# result = coverage_checker.check_coverage(procedure, procedure_cost)
# print(result)