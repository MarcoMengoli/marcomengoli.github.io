---
layout: post
title: OpenCV first steps
description: "First steps with OpenCV"
modified: 2015-041-16
tags: [OpenCV, C++, code, Computer Vision]
categories: [Computer vision]
---

In this first post about computer vision, and in particular about the usage of **OpenCV** library, we will use the **Windows 7** operating system and the **Visual Studio 2012** IDE.

### Download and install

First of all, we need to download and install the OpenCV library. You can find the already compiled packages
[here](https://sourceforge.net/projects/opencvlibrary/files/opencv-win/).

Once you have downloaded it, execute the file and select the path where to install the library.

### Environment configurations

Now we have to set the environment variables. In particular, we add the `OPENCV_PATH` variable with value:

~~~shell
C:\OpenCV\Build\x86\vc11    (if your system is 32 bit)
or
C:\OpenCV\Build\x64\vc11    (if your system is 64 bit)
~~~

Note that vc11 is specific for VisulStudio2012, vc10 for VS2010 and vc12 for later versions.

If we decide to use static libraries into our C++ software, our environment variables configuration is already done.

If we want to use dynamic libraries (windows' DLL), we have to specify to the operating system the location where to find them. We do it by adding to the `PATH` variable the OpenCV **bin** path:

~~~shell
%OPENCV_DIR%\bin
~~~

### Visual Studio configurations

After setting all environment variables, we are ready to launch VisualStudio. First of all, we create a new Win32 Application project.

Once the project is created, we need to set the **include path** and the **additional libraries path**. Unfortunately we have to set these properties for each project. Visual Studio helps us to do quickly those things by creating a properties file the first time, save it and then load it for each project.

To do this, we need to switch from the **Solution explorer** window to **Property manager**. As we can see, there are two main directories: Debug and Release.

Right click on the former, **Add new project Property sheet**.
Now go to `C/C++ -> Additional Include Directories` and add

~~~shell
$(OPENCV_PATH)\..\..\include
~~~

Then `Linker -> General -> Additional Include Directories` and add

~~~shell
$(OPENCV_PATH)\staticlib
~~~

Note: the official openCV guide reported to add the **lib** directory, not **staticlib**. However, doing that, it fails to compile because of the lack of the libraries. Looking into the **lib** folder, we cannot found those libraries indicated below, while we can found them in **staticlib**.

Finally, `Linker -> Input -> Additional Dependencies` and add the libraries you want to import, for example:

~~~shell
opencv_core300d.lib
opencv_highgui300d.lib
opencv_imgproc300d.lib
~~~

The full list is available here:

~~~shell
opencv_calib3d300d.lib
opencv_core300d.lib
opencv_features2d300d.lib
opencv_flann300d.lib
opencv_highgui300d.lib
opencv_imgcodecs300d.lib
opencv_imgproc300d.lib
opencv_ml300d.lib
opencv_objdetect300d.lib
opencv_photo300d.lib
opencv_shape300d.lib
opencv_stitching300d.lib
opencv_superres300d.lib
opencv_ts300d.lib
opencv_video300d.lib
opencv_videoio300d.lib
opencv_videostab300d.lib
~~~

We can confirm the modifications and press the **save** icon.

We need to do the same thing for the **Release** directory too, with the only difference that consists in omitting the **d** letter at the end of each **Additional Dependencies** library (**d** is only for debug).

Doing these operations, we have created two properties files. We can load those files into every new project without specifying all the properties every time.

Note: sometimes Visual Studio fails to compile although everything appears to be well configurated. Try to close and re-open the IDE: it will probably work again.
