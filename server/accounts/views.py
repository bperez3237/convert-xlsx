from django.shortcuts import render

# Create your views here.
import json
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate
from .models import CustomUser

def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            login(request, user)
            serialized_user = json.dumps({
                'username': user.username,
                'email': user.email,
                # Add any other fields you want to serialize here
            })
            return JsonResponse({'user': serialized_user})
    else:
        form = UserCreationForm()
    return JsonResponse({'error': 'incorrect method'})

def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
        
            serialized_user = json.dumps({
                'username': user.username,
                'email': user.email,
                # Add any other fields you want to serialize here
            })
            return JsonResponse({'user': serialized_user})
        else:
            form = UserCreationForm()
    return JsonResponse({'error': 'incorrect method'})
