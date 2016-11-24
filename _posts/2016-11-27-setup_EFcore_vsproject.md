---
layout: post
title: Setting up the Entity Framework Core in a Visual Studio Project
description: "Setting up the Entity Framework Core in a Visual Studio Project"
modified: 2016-04-24
tags: [.NET core, Entity Framework Core, Visual Studio]
categories: [.NET core]
---

# Setting up the Entity Framework Core in a Visual Studio Project

## Setup EF Core on VS for code-first approach

With the *code-first* approach, once you have generated the *Model* following certain conditions, you will be able to automatically generate the entire database and map the model classes with the generated relational tables.

To use the *EF Core* with this approach, we need to install the packages which provide the EF commands and the database provider (in this example we will use *SqlServer*). 
We can procede using the Nuget *Package Manager Console*, but we can use also the NuGet GUI window.

The packages to be installed are:

* Microsoft.EntityFrameworkCore.SqlServer
* Microsoft.EntityFrameworkCore.Tools -Pre
* Microsoft.EntityFrameworkCore.Design


Before installing a package, we need to check the dependencies that it requires.
Running the `Install-Package Microsoft.EntityFrameworkCore.SqlServer` command, it will install the latest version of the package (currently 1.1.0).
This package depends on other packages with version >= 1.1.0, but in my environment I have installed the LTS version 1.0.1. We have an issue.

There are 2 possible solutions: 

* update the .NET core environment to the non LTS version
* install the `Microsoft.EntityFrameworkCore.SqlServer` package selecting a version which requires dependencies >= 1.0.1

In this case, I prefer to mantain the LTS version of .NET Core framework (1.0.1), so I'm going to install an 'old' version of the `Microsoft.EntityFrameworkCore.SqlServer` package.

Looking at its NuGet page (https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.SqlServer/1.1.0), in the *Version History* section, I can see all its versions.
Clicking on one version, its detailed page will be shown, so I can check the version required for each dependency.

Once I have finished to check the dependencies, I have found that the version 1.0.1 of the `Microsoft.EntityFrameworkCore.SqlServer` is the latest compatible, so I choose to install it.
To do so, I have to run on the Nuget Package Manager Console: `Install-Package Microsoft.EntityFrameworkCore.SqlServer -Version 1.0.1`
After a few seconds (once the *Restoring packages* label on the top of *Solution Explorer* tab fades away), the package is installed in the selected project (the one selected in the *Default project* comboBox in the *Package Manager Console* tab).

Now, let's do the same operations also for `Microsoft.EntityFrameworkCore.Tools` and  `Microsoft.EntityFrameworkCore.Design` packages.

Run the following commands in the Nuget *Package Manager Console*:

~~~ bash
Install-Package Microsoft.EntityFrameworkCore.Tools -Version 1.0.0-preview3-final -Pre
Install-Package Microsoft.EntityFrameworkCore.Design -Version 1.0.1
~~~

The last thing required to complete the EF core setup is to add the EF tools to the `project.json` file (in the root directory of the project).

Open the file and move to the "tool" section. Add between the brackets the following line:

~~~ bash
"Microsoft.EntityFrameworkCore.Tools.DotNet": "1.0.0-preview3-final"
~~~

Make sure that the version corresponds to the one you have installed some minutes ago.

## Setup EF core on VS for database-first approach

If you already have a database, you can generate the model by your database schema.

To setup the EF core framework to work in this way, we have to install the packages required for the *code-first* approach plus the `Microsoft.EntityFrameworkCore.SqlServer.Design`

Run

~~~ bash
Install-Package Microsoft.EntityFrameworkCore.SqlServer.Design -Version 1.0.1
~~~