from django.shortcuts import render
from rest_framework.response import Response
from django.http import HttpResponse, HttpRequest, JsonResponse, FileResponse
from rest_framework.status import HTTP_200_OK
import xlsxwriter
import pandas as pd
import io

# Create your views here.
def index(request):
    print('starting index request')
    # print(request.FILES)
    if "POST" == request.method and request.FILES:
    
        excel_file = request.FILES['file']
        sheet = pd.read_excel(excel_file)
        print(sheet)
        output = io.BytesIO()
        # you may put validations here to check extension or file size

        workbook = xlsxwriter.Workbook(output)
        
        
        # getting a particular sheet by name out of many sheets
        worksheet = workbook.add_worksheet("Sheet1")
        worksheet.write(0, 0, "Hello")
        worksheet.write(1, 0, "Heloooo")
        workbook.close()
        
        output.seek(0)
        
        print(output)
        response = FileResponse(output, content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        response['Content-Disposition'] = 'attachment; filename="excel_file.xlsx"'
        print(response)
        
        # excel_data = list()
        # iterating over the rows and
        # getting value from each cell in row
        # for row in worksheet.iter_rows():
        #     row_data = list()
        #     for cell in row:
        #         row_data.append(str(cell.value))
        #     excel_data.append(row_data)

        return response
    else:
        return HttpResponse("wrong request or missing files")
    
def test(request):
    print('j')
    return JsonResponse({'message': 'testing'})