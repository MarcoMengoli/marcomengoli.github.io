---
layout: post
title: First steps with OpenCV
description: "First steps with OpenCV"
modified: 2016-04-16
tags: [OpenCV, C++, code, Computer Vision]
categories: [Computer vision]
---

In this first post about computer vision, and in particular about the usage of **OpenCV** library, we will use the **Windows 7** operating system and the **Visual Studio 2012** IDE. I'm assuming that you've got this IDE already installed.

### Download and install OpenCV

First of all, we need to download and install the OpenCV library. You can find the already compiled packages
[here](https://sourceforge.net/projects/opencvlibrary/files/opencv-win/).

Once you have downloaded it, run the executable file. Select the directory where the library install.
**Note: to avoid the pain of the hell, DO NOT USE PATH WITH SPACES!!**

### Environment configurations

Now we have to set the environment variables. In particular, we add the `OPENCV` variable with value:

~~~shell
c:\opencv
~~~

If we decide to use static libraries into our C++ software, our environment variables configuration is already done.

If we want to use dynamic libraries (windows' DLL), we have to specify to the operating system the location where to find them. We do it by adding to the `PATH` variable the OpenCV **bin** path:

~~~shell
%OPENCV%\build\x64\vc11\bin
~~~

Note: the vc11 compiler type is specific for Visual Studio 2012, vc10 for VS2010 and vc12 for later versions.

### Visual Studio 2012 configurations

After setting all environment variables, we are ready to launch VisualStudio. First of all, we create a new Win32 Application project.

Once the project is created, we need to set the **include path** and the **additional libraries path**. Unfortunately we have to set these properties for each project. Visual Studio helps us to do quickly those things by creating a properties file the first time, save it and then load it for each project.

To do this, we need to switch from the **Solution explorer** window to **Property manager**. As we can see, there are two main directories: Debug and Release.

Right click on the former, **Add new project Property sheet**.
Now go to `C/C++ -> Additional Include Directories` and add

~~~shell
$(OPENCV)\build\include
~~~

Then `Linker -> General -> Additional Include Directories` and add

~~~shell
$(OPENCV)\build\x64\vc11\lib
~~~

Note: the official openCV guide reported to add the **lib** directory, not **staticlib**. However, doing that, it fails to compile because of the lack of the libraries. Looking into the **lib** folder, we cannot found those libraries indicated below, while we can found them in **staticlib**.

Finally, `Linker -> Input -> Additional Dependencies` and add the libraries you want to import, for example:

~~~shell
opencv_world300d.lib
~~~

We can confirm the modifications and press the **save** icon.

We need to do the same thing for the **Release** directory too, with the only difference that consists in omitting the **d** letter at the end of each **Additional Dependencies** library (**d** is only for debug). The **Additional Dependencies** will be:

~~~shell
opencv_world300.lib
~~~

Doing these operations, we have created two properties files. We can load those files into every new project without specifying all the properties every time.

#### x64 configuration

Only if your system is 64 bit, you need to do the last configuration.

In the **Properties** windows, click the **Configuration Manager...** button.
In the window that appears, click in the combobox under the **Platform** column, select the **<New...>**.
In the **Copy settings from** combobox, select **x64**. Confirm everything and your project is configurated to work into a 64 bit system.

*Note: this setting is to do for every project, since it's not possible to save it into the Property Sheet.

Note: sometimes Visual Studio fails to compile although everything appears to be well configurated. Try to close and re-open the IDE: it will probably work again.

#### Links
Here are the links to download the [debug](https://github.com/MarcoMengoli/marcomengoli.github.io/blob/master/filesForPosts/opencv/OPENCV_DEBUG_PropertySheet.props) and [release](https://github.com/MarcoMengoli/marcomengoli.github.io/blob/master/filesForPosts/opencv/OPENCV_RELEASE_PropertySheet.props) property sheets for Visual Studio 2012.
