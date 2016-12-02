---
layout: post
title: Go channels
description: "Explaining via examples the difference between buffered and unbuffered channels in the Go language."
modified: 2016-01-10
tags: [Go, message-passing]
categories: [Go language]
---

This article describes the differences between the buffered and unbuffered channels provided by the Go language.


## Syntax

#### Creating an unbuffered channel

``` go
var channel = make(chan int)
```


#### Creating a buffered channel


``` go
var channel = make(chan int, BUFF_SIZE)
```


#### Reading a value from a channel

``` go
var value = <- channel` or `value := <- channel
```

#### Sending a value into a channel

``` go
channel <- value
```

## Description

Basically, **buffer size** corresponds to the number of *goroutines* that can send a value to the channel without blocking before a **receive** operation is performed on it: subsequent goroutines sending a value will block and wait until at least one *receive* operation reads data from the channel.

The behavior of a **send** operation can be summarized as follows:

1. A goroutine appends a value into the channel using the `<-` operator (e.g. `channelName <- value`)

2. Every channel includes a *buffer* and a *queue* of values.

	1. If the buffer is not full, the value is appended to the buffer. The sender process can go on without blocking.

	2. If the buffer is full (or with size = 0), the value is put into the channel queue. The sender process blocks.

On the other hand, the behavior of a **receive** is the following:

1. A process reads a value from the channel using the *<-* operator (e.g. `variable <- channelName`).

	1. If buffer size > 0 and the buffer is currently empty (therefore, its queue is empty as well), the receiver blocks until a value is sent into the channel. The same behavior occurs if buffer size is 0 and the queue is empty.

	2. If the buffer is not empty, the oldest value is extracted from the buffer and returned to the receiver goroutine. **If the queue is empty**, then the number of values into the buffer decrements by one. If the **queue is not empty**, the first value is extracted from the queue, is put into the buffer and *the sender process is unlocked*, so it can continue.


Here's the code used in the example. It consists of 4 goroutines sending an integer value into a channel, and a main function which receives and prints the 4 values retrieved from the channel.

``` go

package main

import ("fmt"
"time")

const BUFF_SIZE = 0

var ch = make(chan int, BUFF_SIZE)

func main() {

	go send(1)
	go send(2)
	go send(3)
	go send(4)


	time.Sleep(time.Second *  4)


	for i := 0; i < 4; i++ {
		fmt.Printf("\t\t\t\tMAIN: I want to read a value from the channel\n")
		<-ch
		fmt.Printf("\t\t\t\tMAIN: I have read a value from the channel\n")

		time.Sleep(time.Second *  2)
	}


	fmt.Printf("EXIT\n")
}

func send(n int){
	time.Sleep(time.Second *  2)

	fmt.Printf("P%d: I want to write value '%d' into the channel\n", n, n)
	ch <- n
	fmt.Printf("P%d: I have written value '%d' into the channel\n", n, n)

}

```



### Unbuffered - Synchronous behavior

#### BUFF_SIZE = 0 or blank parameter

If the channel is unbuffered, sending a value blocks the process until another goroutine executes a *receive* on the channel.

More than one process can send a value onto the same channel. In that case, each of them blocks until a *receive* operation (per message) is performed on the channel.

A similar process applies to *receive*:

* If the buffer queue is empty, it blocks the process which executes the *receive* until a value is available on the channel.

* If the queue is not empty, the first value (in FIFO order) is extracted and the blocked process which inserted that value into the channel can go on.  



~~~

P1: I want to write value '1' into the channel
P2: I want to write value '2' into the channel
P3: I want to write value '3' into the channel
P4: I want to write value '4' into the channel
		MAIN: I want to read a value from the channel
		MAIN: I have read a value from the channel
P1: I have written value '1' into the channel
		MAIN: I want to read a value from the channel
		MAIN: I have read a value from the channel
P2: I have written value '2' into the channel
		MAIN: I want to read a value from the channel
		MAIN: I have read a value from the channel
P3: I have written value '3' into the channel
		MAIN: I want to read a value from the channel
		MAIN: I have read a value from the channel
P4: I have written value '4' into the channel
EXIT

~~~

### Buffered - Asynchronous behavior (until buffer not full)

#### Buffered with BUFF_SIZE = 1

When the channel is buffered,  you can write into it without blocking the goroutine until the buffer is full. After that, the channel behaves as if it were unbuffered; when a process executes a *receive* operation, retrieving a value from the channel's buffer, it decreases the number of "slots" used, unlocking one sending goroutine.

If a goroutine executes a *receive* operation, the buffer is empty and no other value is waiting in the queue (to enter the buffer), the receiving goroutine blocks.

Here are 2 examples involving buffered channels having buffer size set to 1 and 2, respectively.

~~~

P1: I want to write value '1' into the channel
P1: I have written value '1' into the channel
P2: I want to write value '2' into the channel
P3: I want to write value '3' into the channel
P4: I want to write value '4' into the channel
		MAIN: I want to read a value from the channel
		MAIN: I have read a value from the channel
P2: I have written value '2' into the channel
		MAIN: I want to read a value from the channel
		MAIN: I have read a value from the channel
P3: I have written value '3' into the channel
		MAIN: I want to read a value from the channel
		MAIN: I have read a value from the channel
P4: I have written value '4' into the channel
		MAIN: I want to read a value from the channel
		MAIN: I have read a value from the channel
EXIT

~~~

#### Buffered with BUFF_SIZE = 2

~~~

P1: I want to write value '1' into the channel
P1: I have written value '1' into the channel
P2: I want to write value '2' into the channel
P2: I have written value '2' into the channel
P3: I want to write value '3' into the channel
P4: I want to write value '4' into the channel
		MAIN: I want to read a value from the channel
		MAIN: I have read a value from the channel
P3: I have written value '3' into the channel
		MAIN: I want to read a value from the channel
		MAIN: I have read a value from the channel
P4: I have written value '4' into the channel
		MAIN: I want to read a value from the channel
		MAIN: I have read a value from the channel
		MAIN: I want to read a value from the channel
		MAIN: I have read a value from the channel
EXIT

~~~


#### Buffered with BUFF_SIZE = 4

~~~

P1: I want to write value '1' into the channel
P1: I have written value '1' into the channel
P2: I want to write value '2' into the channel
P2: I have written value '2' into the channel
P3: I want to write value '3' into the channel
P3: I have written value '3' into the channel
P4: I want to write value '4' into the channel
P4: I have written value '4' into the channel
		MAIN: I want to read a value from the channel
		MAIN: I have read a value from the channel
		MAIN: I want to read a value from the channel
		MAIN: I have read a value from the channel
		MAIN: I want to read a value from the channel
		MAIN: I have read a value from the channel
		MAIN: I want to read a value from the channel
		MAIN: I have read a value from the channel
EXIT

~~~


#### Buffered with BUFF_SIZE = 5

~~~

P1: I want to write value '1' into the channel
P1: I have written value '1' into the channel
P2: I want to write value '2' into the channel
P2: I have written value '2' into the channel
P3: I want to write value '3' into the channel
P3: I have written value '3' into the channel
P4: I want to write value '4' into the channel
P4: I have written value '4' into the channel
		MAIN: I want to read a value from the channel
		MAIN: I have read a value from the channel
		MAIN: I want to read a value from the channel
		MAIN: I have read a value from the channel
		MAIN: I want to read a value from the channel
		MAIN: I have read a value from the channel
		MAIN: I want to read a value from the channel
		MAIN: I have read a value from the channel
EXIT

~~~
