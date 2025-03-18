from django.shortcuts import render
import requests
from django.http import JsonResponse

import os
from dotenv import load_dotenv
load_dotenv()

ZOHO_CLIENT_ID = os.getenv("ZOHO_CLIENT_ID")
ZOHO_CLIENT_SECRET = os.getenv("ZOHO_CLIENT_SECRET")
ZOHO_REFRESH_TOKEN = os.getenv("ZOHO_REFRESH_TOKEN")
ZOHO_API_ENDPOINT = os.getenv("ZOHO_API_ENDPOINT")


def get_access_token():
    """Fetch a new access token using the refresh token."""
    url = "https://accounts.zoho.com/oauth/v2/token"
    data = {
        "refresh_token": ZOHO_REFRESH_TOKEN,
        "client_id": ZOHO_CLIENT_ID,
        "client_secret": ZOHO_CLIENT_SECRET,
        "grant_type": "refresh_token",
    }
    response = requests.post(url, data=data)
    return response.json().get("access_token")

def fetch_zoho_data(request):
    """Fetch data from Zoho Analytics."""
    access_token = get_access_token()
    headers = {"Authorization": f"Zoho-oauthtoken {access_token}" , "ZANALYTICS-ORGID": "775026292"}
    response = requests.get(ZOHO_API_ENDPOINT, headers=headers)
    
    if response.status_code == 200:
        return JsonResponse(response.json(), safe=False)
    return JsonResponse({"error": "Failed to fetch data"}, status=500)

# Create your views here.
