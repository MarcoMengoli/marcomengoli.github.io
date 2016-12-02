---
layout: post
title: Configure NuGet to work behind a proxy
description: "Configure NuGet to work behind a proxy"
modified: 2016-12-02
tags: [Visual Studio]
categories: [Miscellaneous]
---

If you work behind a proxy, when you try to add a NuGet package to your Visual Studio project, probably this message will compare in the *output* tab:

~~~ text
error: Failed to retrieve information from remote source ...
error: Response status code does not indicate success: 407 (Proxy Authentication Required).
~~~

It means that NuGet is trying to download the package, but the proxy is blocking him.



Open the file `C:\Users\[YOUR_USER_NAME]\AppData\Roaming\NuGet\NuGet.Config` and add inside the `<configuration>  <\configuration>` tag the following:

~~~ script
<config>
	<add key="http_proxy" value="http://[YOUR_PROXY_ADDRESS]:[YOUR_PROXY_PORT]" />
</config>
~~~

replacing:

* `[YOUR_USER_NAME]` with your Windows account name
* `[YOUR_PROXY_ADDRESS]` with the address of the proxy
* `[YOUR_PROXY_PORT]` with the port of the proxy

Open Visual Studio and NuGet should automatically restore the packages.