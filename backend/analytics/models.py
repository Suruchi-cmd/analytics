from django.db import models

class ZohoData(models.Model):
    sales_agent = models.CharField(max_length=255, null=True, blank=True)
    tier_level = models.CharField(max_length=10, null=True, blank=True)
    job_id = models.CharField(max_length=255, null=True, blank=True)
    customer_name = models.CharField(max_length=255, null=True, blank=True)
    stage = models.CharField(max_length=100, null=True, blank=True)
    grand_total = models.CharField(max_length=255, null=True, blank=True)
    financial_status = models.CharField(max_length=10, null=True, blank=True)
    sold_products = models.CharField(max_length=255, null=True, blank=True)
    total_sold_amount = models.CharField(max_length=255, null=True, blank=True)
    total_retail_price = models.CharField(max_length=255, null=True, blank=True)
    total_retail_cost = models.CharField(max_length=255, null=True, blank=True)
    commission = models.CharField(max_length=10, null=True, blank=True)
    installation_deduction = models.CharField(max_length=255, null=True, blank=True)
    sales_commission = models.CharField(max_length=255, null=True, blank=True)
    total_oversold = models.CharField(max_length=255, null=True, blank=True)
    financing_fee = models.CharField(max_length=255, null=True, blank=True)
    lead_deduction = models.CharField(max_length=255, null=True, blank=True)
    travel_cost_deduction = models.CharField(max_length=255, null=True, blank=True)
    cx_compensation_deduction = models.CharField(max_length=255, null=True, blank=True)
    final_oversold_commission = models.CharField(max_length=255, null=True, blank=True)
    total_payment_to_sa = models.CharField(max_length=255, null=True, blank=True)
    carry_forward = models.CharField(max_length=100, null=True, blank=True)
    comission_amount_cchs = models.CharField(max_length=255, null=True, blank=True)
    dealer = models.CharField(max_length=255, null=True, blank=True)
    commission_percentage = models.CharField(max_length=10, null=True, blank=True)

    def __str__(self):
        return f"Job: {self.job_id} - {self.customer_name}"
