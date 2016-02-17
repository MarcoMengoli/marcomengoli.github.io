---
layout: post
title: Python, working with Excel spreadsheets.
description: "Describing how to work on Excel spreadsheets with Python."
modified: 2016-01-26
tags: [Python, Excel]
categories: [Programming Python]
---

Python has a lot of very useful libraries, one of these is *openpyxl*, which gives you the possibility to work with Excel spreadsheets with semplicity.

In this post we will use the Python2 version of the library. The version for Python3 is also available, and should also be compatible with this one.

The full project documentation is available [here](http://openpyxl.readthedocs.org/en/2.3.3/).

The Excel formats currently supported by this module are:

* .xlsx
* .xlsm 
* .xltx
* .xltm

## Installing the library

First of all, to install the openpyxl module, you have to check if in your system a Python package management system is installed. In this post we will use pip.
It comes already installed if using Python 2 >= 2.7.9 or Python 3 >= 3.4. You can install pip in your Linux system entering: 

```shell
sudo apt-get install pip
```
to install pip for python2, or

```shell
sudo apt-get install pip3
```
for python3

After that, install the openpyxl library using pip:

```shell
pip install openpyxl
```

If you want to be able to include images into the Excel file, you have to install also the pillow module:

```shell
pip install pillow
```


## Using the library

### Shebang & importing

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from openpyxl import load_workbook
```

The second line is used to declare the UTF-8 encoding of the Python source file.


### Opening the file

```python
wb = load_workbook("excelFileName.xlsx" [, data_only=True])
```

Setting the data_only attribute to True, you will access to the values of the cells, otherwise you will access to the formula of the cell.

### Selecting a sheet

To select the current sheet, use

```python
sheet = wb.active
```

If you wnat to access to a specific sheet knowing its name, do

```python
sheet = wb["D1_densa_WGS84_quota"]
```

### Reading & writing a cell value

To read a cell value:

```python
val = sheet["D2"].value

ws['D2'] = val
```

### Saving the file

After the modifications apported to the file, remember to save the file:

```python
wb.save('aFileName.xlsm') 
```

Note that the file name used in save() function can be different to the file name used in open() function. In that case, it will create a new file, otherwise if the name is the same it will overwrite the old file.

### Threating column letters as numbers

Working with letters to index a column can be difficult, expecially when you have to do with a lot of column.
A simply solution is to call two functions which gives you the column index of a given letter or the column letter by a given index.

To use these functions, first you have to import them, and then you can invoke.
```python
from openpyxl.cell import get_column_letter, column_index_from_string

colDIndex = column_index_from_string('D')
colLetter = get_column_letter(colIndex)
```	


### Getting the max col and row used

It's useful sometimes to know the last row or column used in the current sheet.

To know these informations, you can use the functions:

```python
maxRow= sheet.max_row
maxCol= sheet.max_column 
```

## Full example

```python

#!/usr/bin/env python3
# -*- coding: utf-8 -*-


from openpyxl import load_workbook
from openpyxl.cell import get_column_letter, column_index_from_string

wb = load_workbook("name.xlsx")    #, data_only=True)

sheet = wb.active
# or sheet = wb["Sheet1"]

excelNorthCol = "A"
excelEastCol = "B"
rowIndex = 1
valueToWrite = 10


north = sheet["{0}{1}".format(excelNorthCol, str(rowIndex))].value # (sheet["A1"].value)
east = sheet["{0}{1}".format(excelEastCol, str(rowIndex))].value # (sheet["B1"].value)


maxCol = sheet.max_column
cell = get_column_letter(maxCol+1) + str(rowIndex)

# or, eventually: 
# columnIndexToWrite = 3
# cell = get_column_letter(columnIndexToWrite) + str(rowIndex)

		
sheet[cell] = valueToWrite

wb.save("name.xlsx")

```


