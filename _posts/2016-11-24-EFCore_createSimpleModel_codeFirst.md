---
layout: post
title: Creating a simple model and generate the database with EF Core 1.0
description: "Creating a simple model and generate the database with EF Core 1.0"
modified: 2016-04-24
tags: [.NET core, Entity Framework Core, Visual Studio]
categories: [.NET core]
---

Create a **ASP.NET Core Web Application (.NET Core)** project and select the template **Web Application**.
In this example I will create a simple Web Application to model a simple school. I will call the project *SchoolWebApp*.

Install the packages for *EF Core tools* and *SqlServer provider* as seen in the [previous post](http://marcomengoli.github.io/.net%20core/setup_EFcore_vsproject/).

### Create the model

Create a *Model* folder. Inside this folder, create a `Student.cs` file and will insert the following properties:

~~~ c#
public int StudentID { get; set; }
public String Name { get; set; }
public String Surname { get; set; }
~~~

Every property of the class will be mapped as a column with the same name in the `Student` table (which will be automatically generated).

Code First infers that a property is a primary key if it's named one of the following:

* Class name followed by "Id".
* "Id"

### Create the context

To generate the database table, it's not sufficient to create the `Student` class. We also need to create a DbContext containing a DbSet class (exposing it as a property) of type `Student`.

Doing this, EF will generate a table named *Students* (class name + "s") and a table for each type referenced by the Student class (in this case nothing).

Let's create a *Persistence* folder in the project root and create inside it a `SchoolContext.cs` file. This file will contain the `SchoolContext`, which extends the `DbContext` class.

This class will allow us to generate the database in an automatic way.

Add the following constructor and property to the class:

~~~ c#
public SchoolContext(DbContextOptions<SchoolContext> options) : base(options) { }

public DbSet<Student> Students { get; set; }
~~~

Add also the `using Microsoft.EntityFrameworkCore;` at the beginning of the file.

### Register the context with DI

In order to use the SchoolContext in the our web application, we need to register it as a service.

The classes of the application (such as controllers) which requires the SchoolContext are provided by Dependency Injection through the class contructor.

Open the `Startup.cs` class and add the following lines at the beginning of `ConfigureServices(IServiceCollection services)` method.

~~~ c#
var connectionString = @"Server=(localdb)\mssqllocaldb;Database=SchoolDatabase;Trusted_Connection=True;";
services.AddDbContext<SchoolContext>(options => options.UseSqlServer(connectionString));
~~~

Add also the `using Microsoft.EntityFrameworkCore;` at the beginning of the file.


### Generate the code to create the database and execute it

We are finally ready to automatically generate the code, which once executed will create the database.

Open the `Package Manager Console` and enter the command `Add-Migration` followed by the name you want to give to this migration. For example:

~~~ bash
Add-Migration CreateStudentsMigration
~~~

Let's look at the project directory: a new **Migration** folder has been generated.

It contains 2 classes:

* 20161124115014_CreateStudentsMigration.cs
* SchoolContextModelSnapshot.cs

Analyze the content of the first file.
It contains a class `CreateStudentsMigration` (the name is the same of the one entered as argument of `Add-Migration` command), which has 2 methods:

* Up
* Down

The `Up` method is responsible of the creation of the `Students` table in the database. It creates the table, the columns and the contraints inferred by the class model.

The `Down` method is responsible to delete the table once it's not longer needed.

Now it's time to generate the database. With EF core is a very simple operation, you only have to run the

~~~ bash
Update-Database
~~~

command to apply the migration.

### View the created database

Of course, we are very interested in viewing the created database.

To do so, open the *SQL Server Object Explorer* tab in Visual Studio, expand the `(localdb)\MSSQLLocalDB` selection, *Database* folder and... here's our brand new `SchoolDatabase`.

Expand it, go into the *Tables* folder and you can find the `dbo.Students` table! 

<figure class="half center">
	<img src="https://marcomengoli.github.io/filesForPosts/DotNET_Core/2016-11-24-EFCore_createSimpleModel_codeFirst/databaseView.PNG" alt="DatabaseView">
	<figcaption title="Students table view">Database view</figcaption>
</figure>

Double clicking on the `dbo.Students` table it will open the *Design window*. Here you can see the table structure and the *SQL* commands that created it.

<figure class="half center">
	<img src="https://marcomengoli.github.io/filesForPosts/DotNET_Core/2016-11-24-EFCore_createSimpleModel_codeFirst/studentsTable.PNG" alt="Students Table View">
	<figcaption title="Students table view">Students table view</figcaption>
</figure>

Well done! We have generated the relational database from our class model!



### Adding a class to the model

In the real world, a student belongs to a class. The class is characterized by a name, a room used for the lecture and, of course, by a set of students.
Let's add a class to the model which represents this concept.

Add to the *Model* folder the `Class.cs` file and insert the following code:

~~~ c#
public class Class
{
	public String ClassId { get; set; }
	public String RoomName { get; set; }
	public List<Student> Students {get; set;}

}
~~~

Now, insert the `Class` class to the `SchoolContext`. It will appear like the following:

~~~ c#
public class SchoolContext : DbContext
{
	public SchoolContext(DbContextOptions<SchoolContext> options) : base(options) { }

	public DbSet<Student> Students { get; set; }
	public DbSet<Class> Classes { get; set; }
}
~~~

To generate another migration file, run the command `Add-Migration` with a name which specifies the operation to do (adding a Class to the database):

~~~ bash
Add-Migration CreateClassesMigration
~~~

As you can see, a new class in the *Migrations* folder has been created, containing the code to create:

##### 1 - Create **Classes** table on the database, composed by *ClassId* and *RoomName* columns

~~~ c#
migrationBuilder.CreateTable(
	name: "Classes",
	columns: table => new
	{
		ClassId = table.Column<string>(nullable: false),
		RoomName = table.Column<string>(nullable: true)
	},
	constraints: table =>
	{
		table.PrimaryKey("PK_Classes", x => x.ClassId);
	});
~~~

##### 2 - Add a **ClassId** column to the **Students** table

~~~ c#
migrationBuilder.AddColumn<string>(
	name: "ClassId",
	table: "Students",
	nullable: true);
~~~

##### 3 - Add the contraint to link the foreign key of table **Students** to the primary key of table **Classes** 

~~~ c#
migrationBuilder.AddForeignKey(
	name: "FK_Students_Classes_ClassId",
	table: "Students",
	column: "ClassId",
	principalTable: "Classes",
	principalColumn: "ClassId",
	onDelete: ReferentialAction.Restrict);
~~~

Now we can apply these changes to the database running:

~~~ bash
Update-Database
~~~

<figure class="half center">
	<img src="https://marcomengoli.github.io/filesForPosts/DotNET_Core/2016-11-24-EFCore_createSimpleModel_codeFirst/studentsTable_afterClassesMigration.PNG" alt="Students Table View After ClassesMigration">
	<figcaption title="Students table view">Students table view after the Classes Migration</figcaption>
</figure>

<figure class="half center">
	<img src="https://marcomengoli.github.io/filesForPosts/DotNET_Core/2016-11-24-EFCore_createSimpleModel_codeFirst/classessTable.PNG" alt="Classes Table View">
	<figcaption title="Students table view">Students table view</figcaption>
</figure>

As you can see, EF automatically infers the 1:N relation between **Students** and **Classes** and generates the foreign key in the **Students** table. *That's very elegant*!


### Undoing a database update

What can we do if the migration we have applied was wrong?
Fortunately, EF provides also this scenario.

If you want to undo the `Update-Database` command, you can just run a `Update-Database` followed by the name of the migration you want to rollback.
For example, if we want to come back to the previous state, when we had only the Students table, just run:

Now it's time to generate the database. With EF core is a very simple operation, you only have to run:

~~~ bash
Update-Database CreateStudentsMigration
~~~

