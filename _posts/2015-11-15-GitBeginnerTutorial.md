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


To remove a file you have added to the staging area, you can do a rm in 2 ways:
{% highlight bash %}
git rm --cache<filename>
{% endhighlight %}
will remove the file to the staging area, but it remains on your working directory (it's not removed from your disk), while
{% highlight bash %}
git rm <filename>
{% endhighlight %}
removes the file also from the disk other then the staging area.


To check what's the state of each file, run:
{% highlight bash %}
git status
{% endhighlight %}




Now your new/modified files are on the stage. If you want to store these files into the repository, you have to commit the changes using

{% highlight bash %}
git commit -m "commit message"
{% endhighlight %}


To upload the changes to the "master" branch on the original repository:
{% highlight bash %}
git push origin master
{% endhighlight %}
