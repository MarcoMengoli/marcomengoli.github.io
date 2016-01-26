---
layout: post
title: Python, spawn a process and obtain input, output, error & return code
description: "Explaining how to spawn a process, manage input, capture output and error streams in Python language."
modified: 2016-01-27
tags: [Python, subprocess]
categories: [Programming Python]
---

Documentation available [here](https://docs.python.org/2/library/subprocess.html)


Python2, 3 boh

Attention: "Passing shell=True can be a security hazard if combined with untrusted input."



~~~ text

#!/usr/bin/env python
# -*- coding: utf-8 -*-
import subprocess
import re
import string

try:
	output=subprocess.check_output("applicationName inputParamentes --options .o", shell=True)



	regex = r"\d+°\s+-\s+(\d+)" 

	
	
	pattern = re.compile(regex)
	
	
	i=0

	for match in pattern.finditer(output) :
		degree = match.group(1)
		print("{0} --> {1}".format(i, degree))
		i=i+1
        
	#print(output)
except:
	print("ERROR")

~~~

