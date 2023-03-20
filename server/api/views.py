from django.shortcuts import render
from rest_framework.response import Response
from django.http import HttpResponse, HttpRequest, JsonResponse
from rest_framework.status import HTTP_200_OK
import xlsxwriter
import pandas as pd

# Create your views here.
def index(request):
    print('starting index request')
    # print(request.FILES)
    if "POST" == request.method and request.FILES:
    
        excel_file = request.FILES['file']
        sheet = pd.read_excel(excel_file)
        print(sheet)
        # you may put validations here to check extension or file size

        workbook = xlsxwriter.Workbook(excel_file)
        
        
        # getting a particular sheet by name out of many sheets
        worksheet = workbook.add_worksheet("Sheet1")

        excel_data = list()
        # iterating over the rows and
        # getting value from each cell in row
        # for row in worksheet.iter_rows():
        #     row_data = list()
        #     for cell in row:
        #         row_data.append(str(cell.value))
        #     excel_data.append(row_data)

        return JsonResponse({"excel_data":excel_data})
    else:
        return HttpResponse("GET request")
    
def test(request):
    print('j')
    return HttpResponse('testing')