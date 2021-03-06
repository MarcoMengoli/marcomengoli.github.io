---
layout: post
title: Git command line basics
description: "Providing the basic commands for a beginner use of Git."
modified: 2015-11-15
tags: [Git, code]
categories: [Tutorial]
---

you can add your modified files to the stage (index) using:
{% highlight bash %}
git add <filename>
{% endhighlight %}
or
{% highlight bash %}
git add *
{% endhighlight %}

Now your new/modified files are on the stage. If you want to store these files into the repository, you have to commit the changes using

{% highlight bash %}
git commit -m "commit message"
{% endhighlight %}


To upload the changes to the "master" branch on the original repository:
{% highlight bash %}
git push origin master
{% endhighlight %}
