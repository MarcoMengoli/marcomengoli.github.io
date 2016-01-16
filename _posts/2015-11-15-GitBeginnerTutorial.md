---
layout: post
title: Git command line basics
description: "Providing the basic commands for a beginner use of Git."
modified: 2015-11-15
tags: [Git, code]
categories: [Tutorial]
---

In this post are listes the very few basic git commands with a brief description.

### Add/remove files to/from the staging area

You can add your modified files to the stage (index) using:
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


### Check the state
To check what's the state of each file, run:
{% highlight bash %}
git status
{% endhighlight %}


### Commit

Now your new/modified files are on the stage. If you want to store these files into the repository, you have to commit the changes using

{% highlight bash %}
git commit -m "commit message"
{% endhighlight %}

You can also commit writing more complex messages using the default git editor.
To do that, just do a 
{% highlight bash %}
git commit
{% endhighlight %}
The default git editor will appear. Type the message, save and exit to execute the commit.
To change the default git editor just do:

{% highlight bash %}
git config --global core.editor YOUR_EDITOR_NAME_HERE
{% endhighlight %}
replacing YOUR_EDITOR_NAME_HERE with emacs, vim, nano or what you want.


Now, if you want to view the history of your commits, do a:
{% highlight bash %}
git log [--options]
{% endhighlight %}
Some options are:
-p   which introduces the differences between each commit
--graph   to see an ASCII graph of branches and merges
--stat   to see some abbreviated stats for each commit
--shortstat    to se an abbreviation of stat command


### Working with remotes
After the commits, you probably want to update the remote repository with your new changes.

To upload the changes to the "master" branch on the original repository:
{% highlight bash %}
git push origin master
{% endhighlight %}

To view the list of your remotes:
{% highlight bash %}
git remote -v
{% endhighlight %}


If you want to refresh your local repository including the changes from the remote repository, you can do a pull in this way:

{% highlight bash %}
git pull
{% endhighlight %}


### Tag
You can tag a version in 2 ways: annotated or lightweight.

ANNOTATED tags are stored in the Git database adding some informations.
It's recommended to use this type of tag to store more information.

{% highlight bash %}
git tag -a TAG [-m TAG_MESSAGE]
{% endhighlight %}
replacing TAG with your tag (eg v1.2) without quotes or double quotes
TAG_MESSAGE, instead, is a text message between double quotes "...".

LIGHTWEIGHT tag are just a sort of pointer to a branch.
{% highlight bash %}
git tag TAG-lw
# for example, git tag v1.2-lw
{% endhighlight %}


You can also tag later (a past branch). In this case the syntax is the following:
{% highlight bash %}
git tag -a TAG COMMIT_HASH
{% endhighlight %}
where COMMIT_HASH is the checksum (or a part of it) of the branch to tag.

