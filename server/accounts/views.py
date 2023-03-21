from django.shortcuts import render

# Create your views here.
import json
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login as auth_login, authenticate
# from .models import CustomUser
from django.views.decorators.csrf import csrf_exempt

from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_protect
from django.http import JsonResponse

# def signup(request):
#     if request.method == 'POST':
#         form = UserCreationForm(json.loads(request.body))
#         if form.is_valid():
#             form.save()
#             username = form.cleaned_data.get('username')
#             password = form.cleaned_data.get('password1')
#             user = authenticate(username=username, password=password)
#             login(request, user)
#             serialized_user = json.dumps({
#                 'username': user.username,
#                 'email': user.email,
#                 # Add any other fields you want to serialize here
#             })
#             return JsonResponse({'user': serialized_user})
#     else:
#         form = UserCreationForm()
#     return JsonResponse({'error': 'incorrect method'})


# @csrf_exempt
# def login(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
        
#         email = data['email']
#         password = data['password']
#         user = authenticate(request, email=email, password=password)
#         if user is not None:
#             login(request, user)
        
#             serialized_user = json.dumps({
#                 'email': user.email,
#                 # Add any other fields you want to serialize here
#             })
#             return JsonResponse({'user': serialized_user})
#         else:
#             form = UserCreationForm()
#     return JsonResponse({'error': 'incorrect method'})

from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_protect
from django.http import JsonResponse

@csrf_exempt
def login(request):
    if request.method == 'POST':
        # Retrieve the username and password from the request body
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        # Authenticate the user
        user = authenticate(request, username=username, password=password)
        if user is not None:
            # Login the user
            auth_login(request, user)
            
            # Return the user data as a JSON response, including the CSRF token
            csrf_token = get_token(request)
            response_data = {
                'user': {
                    'username': user.username,
                    'email': user.email,
                    # Add any other fields you want to serialize here
                },
                'csrf_token': csrf_token,
            }
            return JsonResponse(response_data)
        
        # If authentication fails, return an error message
        response_data = {'error': 'Invalid login credentials'}
        return JsonResponse(response_data, status=401)
    
    # If the request method is not POST, return an error message
    response_data = {'error': 'Invalid request method'}
    return JsonResponse(response_data, status=400)
