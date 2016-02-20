---
layout: post
title: Go channels
description: "Explaining with examples the difference between buffered and unbuffered channels in Go language."
modified: 2016-01-10
tags: [Go, message-passing]
categories: [Programming Go]
---

In this article are described the differences between buffered and unbuffered channels provided by the Go language.

## Syntax

#### Creating an unbuffered channel

`var channel = make(chan int)`

#### Creating an buffered channel

`var channel = make(chan int, BUFF_SIZE)`

#### Read a value from the buffer

`var value = <- channel` or `value := <- channel`

#### Sent a value into the buffer

`channel <- value`

## Description

In a very simple way: the buffer size indicates the number of goroutines which have sent a value on the channel and that can procede without blocking (assuming that each goroutine sends only a value into the channel before a *receive* operation). Other subsequent goroutines sending a value will block themself and wait until those goroutines enter into the buffer (because of at least one *receive* operation on that channel is done) or until their value is directly retrieved from the channel (as a result of a channel *receive* operation if and only if buffer size is 0, which means unbuffered channel).

The behavior of a **send** operation can be summarized as follows:

1. A goroutine puts a value into the channel using the *<-* operator (e.g. channelName <- value)
2. Every channel is composed by a buffer and a queue, which contain a set of values. 
	1. If the buffer is not full, the value is put into the buffer. The sender process can procede without blocking.
	2. If the buffer is full (or with size = 0), the value is put into the channel queue. The sender process blocks.
	
The behavior of a **receive** is instead:

1. Another process reads a value from the channel using the *<-* operator (e.g. variable <- channelName).
	1. If the buffer has size > 0 and is currently empty (and of course also the queue is empty), the receiver blocks until a value is put into the channel. The same behavior occur if buffer size is 0 and the queue is empty.
	2. If there's something into the buffer, the first value is extracted from the buffer and returned to the receiver goroutine. If the **queue is empty**, then the number of values into the buffer decrements by one. If the **queue is not empty**, the first value is extracted from the queue, is put into the buffer and *the sender process is unlocked*, so it can go further.


Here's the code used in the example. It consists in 4 goroutines which send an integer value into the channel and a main which receives and prints the 4 values retrieved from the channel.

~~~go

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

~~~






### Unbuffered - Synchronous behavior

#### BUFF_SIZE = 0 or blank parameter
If the channel is unbuffered, sending a value blocks the process until another goroutine executes a *receive* on the channel. 

More than one process can send a value on the same channel. In that case, each of them blocks until a *receive* operation (for each sender) is done into the channel.

The same behavior happens for the *receive*:

* If the buffer queue is empty, it blocks the process which executes the *receive* until a value is put on the channel.

* If the queue is not empty, the first value is extracted and the process (currently blocked) which has inserted that value into the channel is unlocked, so it can go further.  



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
When the channel is buffered,  you can write in that channel without blocking the goroutine until the buffer is full. After that, the behavior is the same as unbuffered channels. When a process executes a *receive* operation, retrieving a value from the channel's buffer, it decreases the number of "slot" used, unlocking the sending goroutine, which can go further.

If a goroutine executes a *receive* operation, the buffer is empty and no other value is waiting in the queue (to enter into the buffer), the receiving goroutine blocks itself.

Here there are 2 examples of buffered channel behaviors with buffer size set to 1 and 2 respectively.

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
