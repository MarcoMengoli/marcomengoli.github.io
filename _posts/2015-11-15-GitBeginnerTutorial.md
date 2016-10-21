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

~~~shell
git <command-name> --help
~~~ 

Where `command-name` is the Git command you want to know deeply.

## BASICS

### Adding/removing files to/from the staging area

You can add your modified files to the stage (index) using:

~~~shell
git add <filename>
~~~ 

or, to add every modified file:

~~~shell
git add *
~~~ 

To remove a file you have added to the staging area, you can do a rm in 2 ways:

~~~shell
git rm --cache<filename>
~~~ 

will remove the file to the staging area, but it remains on your working directory (it's not removed from your disk), while

~~~shell
git rm <filename>
~~~ 

removes the file also from the disk other then the staging area.


### Check the state
To check what's the state of each file, run:

~~~shell
git status
~~~ 


### Commit

Now your new/modified files are on the stage. If you want to store these files into the repository, you have to commit the changes using

~~~shell
git commit -m "commit message"
~~~ 

You can also commit writing more complex messages using the default git editor.
To do that, just do a 

~~~shell
git commit
~~~ 

The default git editor will appear. Type the message, save and exit to execute the commit.
To change the default git editor just do:

~~~shell
git config --global core.editor YOUR_EDITOR_NAME_HERE
~~~ 
replacing YOUR_EDITOR_NAME_HERE with emacs, vim, nano or what you want.


Now, if you want to view the history of your commits, do a:

~~~shell
git log [--options]
~~~ 

Some options are:

* -p   which introduces the differences between each commit
* --graph   to see an ASCII graph of branches and merges
* --stat   to see some abbreviated stats for each commit
* --shortstat    to se an abbreviation of stat command


## TAG
You can tag a version in 2 ways: annotated or lightweight.

ANNOTATED tags are stored in the Git database adding some informations.
It's recommended to use this type of tag to store more information.

~~~shell
git tag -a TAG [-m TAG_MESSAGE]
# e.g. git tag -a v1.2 -m "some text here"
~~~ 

replacing TAG with your tag (eg v1.2) without quotes or double quotes
TAG_MESSAGE, instead, is a text message between double quotes "...".

LIGHTWEIGHT tag are just a sort of pointer to a branch.

~~~shell
git tag TAG-lw
# for example, git tag v1.2-lw
~~~ 


You can also tag later (a past branch). In this case the syntax is the following:

~~~shell
git tag -a TAG COMMIT_HASH
~~~ 
where COMMIT_HASH is the checksum (or a part of it) of the branch to tag.


To view all tags (or a few using the search pattern):

~~~shell
git tag -l [pattern]
~~~ 

## BRANCH

### Create branch and checkout

To create a new branch:

~~~shell
git branch NewBranchName
~~~


After the creation of the new branch, we are still on the "old" branch, so we switch on the new with:

~~~shell
git checkout NewBranchName
~~~ 

There is also a shortucut to create a new branch and immediately move into it. We do that typing:

~~~shell
git checkout -b NewBranchName
~~~ 

where the -b option lets the checkout command to create the branch to switch on.

### List

To view the list of all branches, add the -l option as usual.

~~~shell
git branch -l
~~~ 

There are also two useful options, `--merged` and '--no-merged`, that filter the list of branch to only those who are already merged or not into your current branch.

~~~shell
git branch --merged
git branch --no-merged
~~~ 

### Merge

First, checkout to the branch A in which you want to merge the other branch B. Doing this, the modifications in file B are merged in branch A (B->A).

~~~shell
git checkout MainBranchName

git merge NewBranchName
~~~ 


### Delete


After the merge operation, you maybe want to delete the branche merged. You can do this with command:

~~~shell
git branch -d NewBranchName
~~~ 

To force the deletion of a branch despite there are changes not merged, use the -D option (uppercase):

~~~shell
git branch -D NewBranchName
~~~ 

## STASH

Sometimes it happens that you're working on a branch, you have uncommitted files you don't want to commit because the work is not already completed.
This makes impossibile to change branch.
To remedy this problem, you can use *stash*.
*Stash* takes the uncommitted files on your working directory and stores them into a stash list.

### Stashing
To insert the uncommitted files into the stash list, run:

~~~ shell
git stash
~~~

Now running a *git status* you can see that the working directory is clean.
This means that you can switch to another branch and do the work.

### List
To view the stash list, run:

~~~ shell
git stash list
~~~

### Apply stash
After you have switched to another branch and completed the work, you maybe want to switch back to the previous branch and resume the work you were doing before.

In this case you need to retrieve the stashed files and apply them to those on the current branch. To do it, print the stash list and run:

~~~ shell
git stash apply <stash-id>
e.g. git stash apply stash@{0}
~~~

### Drop stash
If you have successfully applied the stash, it remains into the stash list.
If you have not applied the stash, maybe you don't need no more those stashed files.

It both cases it's a good thing to delete those files. Do delete a stash, run:

~~~ shell
git stash drop <stash-id>
e.g. git stash drop stash@{0}
~~~


## REMOTES

### Push
After the commits, you probably want to update the remote repository with your new changes.

To upload the changes to the "master" branch on the "origin" repository:

~~~shell
git push origin master
~~~ 

### Fetch

To get all the data from a remote repository that you haven't on local, you can do a fetch instruction.
It's important to note that Fetch instruction doesn't merge nothing and doesn't modify nothing you're working on, only downloads the data you haven'r yet.

~~~shell
git fetch remoteName
~~~ 

### Pull

The *Pull* command is similar to *Fetch*, but it merges the remote data with the local data of the branch you're currently working on.
Pull fetches and merges data only for the current branch you're on, it doesn't afflict the other branches.

**Note that your branch must be set up to track a remote branch to run the Pull command. By default the Clone command sets up only the master branch**

~~~shell
git pull
~~~ 

If there is no tracking information for the current branch you are on, you have to specify which branch you want to merge with.
You can do it adding the remote and branch names.

~~~ shell
git pull <remote> <branch>>
~~~

### Delete

To delete a remote branch, you can do in 2 ways:

- from Git 1.5:

~~~shell
git push origin :remoteBranchName
~~~ 

from Git 1.7:

~~~shell
git push origin --delete remoteBranchName
~~~ 

### Difference local/remote branches

To view the differences between a local branch and the corresponding remote branch, you have first do execute a Fetch instruction, then Diff:

~~~shell
git diff localBranchName remoteName/remotBranchName
~~~ 

### Managing remotes

You can add a remote repository other than the "origin" just doing:

~~~shell
git remote add -f remoteName URLofRepo
#e.g. git remote add github_remote https://github.com/MarcoMengoli/MorseCodeEmitter_RPi_Py
~~~ 

`-f` is to fetch the remote branches 

Now you can do a push/fetch to/from this repository.
Common use case: you create a project in a directory and initialize a Git repository here with `git init`. Now you create a remote repository on you favorite Git server. How to merge these two repositories? Simply doing a `git remote add -f origin remote_repo_url`.


To view the list of your remotes:

~~~shell
git remote -v
~~~ 

To inspect the content of a remote, knowing the branch available on the remote and local branch configured for pull or push, do:

~~~shell
git remote show remoteName
#e.g. git remote show origin
~~~ 

To remove a remote:

~~~shell
git remote rm remoteName
~~~ 

To rename a remote:

~~~shell
git remote rename oldRemoteName newRemoteName
~~~ 


## GIT CONFIG

### Show current settings

To view all your current Git settings, run:

~~~ shell
git config --list
~~~

To view a specific setting, run:

~~~ shell
git config <setting-name>
e.g. git config user.name
~~~

### Git credential cache

Sometimes it happens you have to enter your Git credentials frequently. It can become a boring thing.

The credential cache can give you a help. You can impose a timeout time in which you credentials remain memorized into the system. 
You can do it running:

~~~ shell
git config credential.helper 'cache --timeout=nsecs'
~~~
where nsecs is the timeout value in seconds.


### User name and email

It's important to set user information like name and email address because Git uses these informations on storing commits, and those commits are immutable.

To set user name and email address run:

~~~ shell
git config --global user.name "Your name"
git config --global user.email your@email.com
~~~

### Text editor

One useful thing you can set is the text editor that Git will offer you to type a message.
Git uses your current system's editor. To chose a different one run:

~~~ shell
git config --global core.editor <editor-name>
~~~

### Alias

An alias in git is... an alias: you can map a git command with a name, so you have not to enter the (maybe) long command string but only `git aliasName`.
To add an alias to Git, you have to do the following:

~~~ shell
git config --global alias.AliasName "your git command here"
#example: git config --global alias.BranchTree "log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)' --all"
~~~

Let's look at the example: we have not to write this very long `git log ...` command, but only `git BranchTree`.

##### Aliases to print the branches tree I recommend to add

I recommend to add the aliases you can find on [Slipp D. Thompson's answer on StackOverflow](https://progit.org/).

To add them, just do:

~~~ shell
git config --global alias.branchtree1 "log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)' --all"
git config --global alias.branchtree2 "log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold cyan)%aD%C(reset) %C(bold green)(%ar)%C(reset)%C(bold yellow)%d%C(reset)%n''          %C(white)%s%C(reset) %C(dim white)- %an%C(reset)' --all"
git config --global alias.branchtree3 "log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold cyan)%aD%C(reset) %C(bold green)(%ar)%C(reset) %C(bold cyan)(committed: %cD)%C(reset) %C(bold yellow)%d%C(reset)%n''          %C(white)%s%C(reset)%n''          %C(dim white)- %an <%ae> %C(reset) %C(dim white)(committer: %cn <%ce>)%C(reset)' --all"
~~~

After you have done that, you can simply call these Git commands in the same way of another built-in Git command:

~~~ shell
git branchtree1
git branchtree2
git branchtree3
~~~
