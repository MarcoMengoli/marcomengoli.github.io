---
layout: post
title: OpenCV 3, the Mat object
description: "OpenCV 3: the Mat object"
modified: 2016-04-20
tags: [OpenCV, C++, code, Computer Vision]
categories: [Computer vision]
---

In this post we will introduce the most used object of the new OpenCV3 library, using C++.

The aim of the **Mat** object is to represent a matrix.
It is composed by two parts: the header and the data.

* The header contains information about the matrix itself (like the size of the matrix, the data type, number of channels etc...)
* The data contains the pointer to the real matrix

Each Mat object has its header, while the data can be shared between multiple instances. The data will be deallocated only when there are no Mat objects pointing to it.

Mat is a very useful object: it is used in a lot of OpenCV functions and it also provides an automatic memory allocation and its release, so the programmers don't need to do it manually.

## Library

The Mat object and the functions we will see in this post are defined within the **Core** library.

We can include it with the following preprocessor directive:

~~~c
#include <opencv2\core\core.hpp>
~~~

Everything within this package is contained belogns to the `cv` namespace.

You can choose to prepend the namespace `cv::` to each object and function of the core library you are using as follows

~~~c
cv::Mat
// or
cv::imread(...)
~~~

You can also avoid prepending the namespace with the `using namespace` directive, as follows:

~~~c
using namespace cv;
~~~

We will choose the second way.

## Creating the Mat object

#### Sharing the same data

When using the assignment operator or the copy constructor, we get Mat instances having their own header, but sharing the same data.

In the following example, objects A, B and C will point to the same data, so modifying one or more cells in matrix A, the same changes will result on matrices B and C.

~~~c
Mat A = ...;
Mat B(A);
// or
Mat C = A;
~~~

#### Cloning the data

To obtain two distinct matrices, so that modifying a value on the first will not affect the same value of the second, we can use the `clone()` or `copyTo()` operators.

In this way the two matrices will have different headers and two distinct datas, which will have the same values at the moment of the clone operation.

~~~c
Mat A = ...;
Mat B = A.clone();
// or
Mat C;
A.copyTo(C);
~~~

#### Reading an image

To initialize a Mat object filling its values directly from an image saved into the memory, you can use the **imread** function, whose signature is

**imread(String & filename, int flags = IMREAD_COLOR)** 

which expects two parameters:

* the name of the image file to load and file
* the image mode (the default is IMREAD_COLOR), for example:

~~~c
IMREAD_UNCHANGED  If set, return the loaded image as is (with alpha channel, otherwise it gets cropped).
IMREAD_GRAYSCALE  If set, always convert image to the single channel grayscale image.
IMREAD_COLOR      If set, always convert image to the 3 channel BGR color image.
IMREAD_ANYDEPTH   If set, return 16-bit/32-bit image when the input has the corresponding depth, otherwise convert it to 8-bit.
IMREAD_ANYCOLOR   If set, the image is read in any possible color format.
~~~

The function loads the image from the specified file, allocates the memory and returns the Mat object.

If the image cannot be read, the function returns an empty matrix (Mat::data==NULL).

#### Creating a new Mat object

We can create a Mat object also specifying its size (the number of rows and columns), the number of channels per cell and its initial value.

~~~c
Mat A(int rows, int cols, int type, Scalar & s);
~~~

the **type** parameter is constructed according to the following convention:

~~~c
CV_[number of bits per value][value Type]C[number of channels]
eg:
CV_8UC1   -  8  bit per channel, Unsigned char, 1 channel per cell
CV_8UC2   -  8  bit per channel, Unsigned char, 2 channels per cell
CV_8UC3   -  8  bit per channel, Unsigned char, 3 channels per cell
CV_8UC(n) -  8  bit per channel, Unsigned char, n channels per cell
CV_64FC1  -  64 bits per channel, float , 1 channel per cell
CV_64FC4  -  64 bits per channel, float , 4 channels per cell
CV_64FC(n)-  64 bits per channel, float , n channels per cell
~~~

The **Scalar** type s is an optional **4-element short vector** value to initialize each matrix element with.

*The type Scalar is widely used in OpenCV to pass pixel values*.

Let's see some examples:

~~~c
Mat M(2,2, CV_8UC3, Scalar(0,0,255)); // creates a 2x2 matrix, each value is an 8 bit unsigned short, 3 channels for each cell, initialized to 0, 0 and 255.

Mat B(2,2, CV_8UC(1), Scalar::all(0));// creates a 3x3 matrix, each value is an 8 bit unsigned short, only 1 channel for each cell, initializing all cell values  to 0 value.
~~~

#### Other ways to create the Mat object

Three methods similar to the constructor seen above are **Mat::zeros** , **Mat::ones** and **Mat::eye**.

You can use these 3 functions specifying the number of rows, of columns and the type of the cell.

~~~c
Mat A = Mat::zeros(2, 2, CV_8UC1); // sets all elements to 0
Mat B = Mat::ones(3, 3, CV_8UC1); // sets all elements to 1
Mat C = Mat::eye(4, 4, CV_8UC1); // sets all elements to 0, except the main diagonal to 1
~~~

The last method to create (small) matrices is using the **<<** operator:

~~~c
Mat A = (Mat_<int>(3,3) << 0, 1, 2, -1, 0, 1, 2, -1, -2);
~~~

## Output

The Mat object can be inserted into the **<<** operators to print the matrix to a stream.

~~~c
Mat A = (Mat_<int>(2,2) << 0, 1, -1, -2);
std::cout << A << std::endl;
~~~


## Save the matrix in an image file on the disk

To save a Mat object, creating an image file on the disk, use the **imwrite** function. Parametes are:

* const String & filename - the file name (including the path) where to save the image
* InputArray img - the object containing the matrix to save

Let's check an example:

~~~c
Mat A = (Mat_<int>(2,2) << 0, 1, -1, -2);
imwrite( "../../images/myIImage.jpg", A );
~~~

## Accessing pixel values

To access to the intensity value of a pixel of the matrix, first you have to know the number of channels per pixel. In a simple grayscale image, there will be only 1 channel, while in a RGB color image there will be 3 channels per pixel.

On a single channel, for example a Mat object of type **8UC1**, you can access the pixel value (0-255) in the following way:

~~~c
Scalar intensity = matrix.at<uchar>(y, x);
~~~

##### Note: to maintain the usual math order (first the row, then the column number), you have to specify the **y parameter before the x parameter**

It can be very tricky, so you can use the **Point** object to prevent sneaky errors:

~~~c
Scalar intensity = matrix.at<uchar>(Point(x, y));
~~~

You can also use this notation to change the value of a pixel:

~~~c
matrix.at<uchar>(Point(x, y)) = 0;  // setting the pixel (x,y) to 0
~~~

On a 3-channel image, the way to access to each pixel and to the 3 values of each pixel (one per channel) is the following:

~~~c
Vec3b intensity = matrix.at<Vec3b>(Point(x, y));
uchar blue = intensity.val[0];
uchar green = intensity.val[1];
uchar red = intensity.val[2];
~~~

##### Note: the RedGreenBlue order is the inverse of what you can expect

Of course, if the matrix type is not equals to **8UC1** you have to change the type of the variables representing each channel. For example, with data type **CV_64FC1**, the variables' type will be:

~~~c
Vec3f intensity = img.at<Vec3f>(y, x);
float blue = intensity.val[0];
float green = intensity.val[1];
float red = intensity.val[2];
~~~

#### Splitting the RGB image

OpenCV provides the `split()` function to split the 3-channels RGB image into 3 Mat objects, one per channel.
The parameters are the Mat object containing the source image and the vector of Mat objects, representing each RGB channel **in reverse order, where the first is Blue, then Green and Red**.

~~~c
vector<Mat> bgr_channels;
split( image , bgr_channels );
~~~


## Visualizing an image

To visualize an image on the screen, especially to check the results of your algorithm, OpenCV includes some very useful method for creating (**namedWindow**) and visualizing (**imshow**) a 8UC image.

Both methods will require, as the first parameter, a String containing the name of the window. Each window will be referenced by its name.

Let's look at an example:

~~~c
Mat matrix = imread("../data/image.jpg");
namedWindow("windowName", WINDOW_AUTOSIZE);
imshow("windowName", matrix);
waitKey(0);
~~~

**waitKey(timeout)** is a function waiting until a timeout for a key stroke. When pressing the key, the focus must be in the "windowName" window, otherwise it's discarded.

##### Note 1: setting the timeout to 0, the function will wait undefinitively until the key stroke

##### Note 2: putting the waitKey function inside a loop, it will create a transition where the speed depends on the timeout time (lower timeout, higher speed) 
