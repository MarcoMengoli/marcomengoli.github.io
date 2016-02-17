---
layout: post
title: Git command line basics
description: "Providing the basic commands for a beginner use of Git."
modified: 2015-11-15
tags: [Git, code]
categories: [Tutorial]
---

In this post are listes the very few basic git commands with a brief description.

I suggest the reading of the beautiful free e-book written by Scott Chacon and Ben Straub available [here](https://progit.org/).
It's very well written, very clear, with a lot of examples. This post contains only the syntax of few commands you can find in the book more in-depth.

You can also improve your knowledge of command usage looking at the man help:
{% highlight bash %}
git COMMAND --help
{% endhighlight %}
Where COMMAND is the Git command you want to know deeply.

## BASICS

### Add/remove files to/from the staging area

You can add your modified files to the stage (index) using:
{% highlight bash %}
git add <filename>
{% endhighlight %}
or, to add every modified file:
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

* -p   which introduces the differences between each commit
* --graph   to see an ASCII graph of branches and merges
* --stat   to see some abbreviated stats for each commit
* --shortstat    to se an abbreviation of stat command


## TAG
You can tag a version in 2 ways: annotated or lightweight.

ANNOTATED tags are stored in the Git database adding some informations.
It's recommended to use this type of tag to store more information.

{% highlight bash %}
git tag -a TAG [-m TAG_MESSAGE]
# e.g. git tag -a v1.2 -m "some text here"
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


To view all tags (or a few using the search pattern):
{% highlight bash %}
git tag -l [pattern]
{% endhighlight %}

## BRANCH

### Create branch and checkout

To create a new branch:
{% highlight bash %}
git branch NewBranchName
{% endhighlight %}


After the creation of the new branch, we are still on the "old" branch, so we switch on the new with:
{% highlight bash %}
git checkout NewBranchName
{% endhighlight %}

There is also a shortucut to create a new branch and immediately move into it. We do that typing:
{% highlight bash %}
git checkout -b NewBranchName
{% endhighlight %}
where the -b option lets the checkout command to create the branch to switch on.

### List

To view the list of all branches, add the -l option as usual.
{% highlight bash %}
git branch -l
{% endhighlight %}

### Merge

First, checkout to the branch A in which you want to merge the other branch B. Doing this, the modifications in file B are merged in branch A (B->A).
{% highlight bash %}
git checkout MainBranchName

git merge NewBranchName
{% endhighlight %}


### Delete


After the merge operation, you maybe want to delete the branche merged. You can do this with command:
{% highlight bash %}
git branch -d NewBranchName
{% endhighlight %}

To force the deletion of a branch despite there are changes not merged, use the -D option (uppercase):
{% highlight bash %}
git branch -D NewBranchName
{% endhighlight %}


## REMOTES

### Push
After the commits, you probably want to update the remote repository with your new changes.

To upload the changes to the "master" branch on the "origin" repository:
{% highlight bash %}
git push origin master
{% endhighlight %}

### Fetch

To get all the data from a remote repository that you haven't on local, you can do a fetch instruction.
It's important to note that Fetch instruction doesn't merge nothing and doesn't modify nothing you're working on, only downloads the data you haven'r yet.

{% highlight bash %}
git fetch remoteName
{% endhighlight %}

### Pull

The Pull instruction has the effect of the Fetch, but it tries to merge the remote data with the local data of the branch you're currently working on.
Pull fetches and merges data only for the current branch you're on, it doesn't afflict the other branches.

{% highlight bash %}
git pull
{% endhighlight %}

### Delete

To delete a remote branch, you can do in 2 ways:

- from Git 1.5:
{% highlight bash %}
git push origin :remoteBranchName
{% endhighlight %}

from Git 1.7:
{% highlight bash %}
git push origin --delete remoteBranchName
{% endhighlight %}

### Difference local/remote branches

To view the differences between a local branch and the corresponding remote branch, you have first do execute a Fetch instruction, then Diff:
{% highlight bash %}
git diff localBranchName remoteName/remotBranchName
{% endhighlight %}

### Managing remotes

You can add a remote repository other than the "origin" just doing:

{% highlight bash %}
git remote add remoteName URLofRepo
#e.g. git remote add github_remote https://github.com/MarcoMengoli/MorseCodeEmitter_RPi_Py
{% endhighlight %}
Now you can do a push/fetch to/from this repository.


To view the list of your remotes:
{% highlight bash %}
git remote -v
{% endhighlight %}

To inspect the content of a remote, knowing the branch available on the remote and local branch configured for pull or push, do:
{% highlight bash %}
git remote show remoteName
#e.g. git remote show origin
{% endhighlight %}

To remove a remote:
{% highlight bash %}
git remote rm remoteName
{% endhighlight %}

To rename a remote:
{% highlight bash %}
git remote rename oldRemoteName newRemoteName
{% endhighlight %}

