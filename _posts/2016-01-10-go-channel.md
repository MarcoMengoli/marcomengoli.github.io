---
layout: post
title: Go channel
description: "Explaining with examples the difference between buffered and unbuffered channels in Go language."
modified: 2016-01-10
tags: [Go channel message-passing]
categories: [programming]
---

In this article we experiment with the behavior of buffered or unbuffered channels with the Go language.
Here is the code used in the example, which consist in 4 gorouting which send an int value into the channel and a main which receives and print the 4 values from the channel.

~~~ python
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
	
	
	fmt.Printf("MAIN: I want to read a from the channel\n")
	<-ch
	fmt.Printf("MAIN: I have read a from the channel\n")
	
	
	time.Sleep(time.Second *  2)
	
	fmt.Printf("MAIN: I want to read b from the channel\n")
	<-ch
	fmt.Printf("MAIN: I have read b from the channel\n")
	
	
	time.Sleep(time.Second *  2)
	
	fmt.Printf("MAIN: I want to read c from the channel\n")
	<-ch
	fmt.Printf("MAIN: I have read c from the channel\n")
	
	
	time.Sleep(time.Second *  2)
	
	fmt.Printf("MAIN: I want to read d from the channel\n")
	<-ch
	fmt.Printf("MAIN: I have read d from the channel\n")
	
	
	fmt.Printf("EXIT\n")
}

func send(n int){
	time.Sleep(time.Second *  2)
	
	fmt.Printf("P%d: I want to write %d into the channel\n", n, n)
	ch <- n
	fmt.Printf("P%d: I have written %d into the channel\n", n, n)

}

~~~






## UNBUFFERED - Synchronous behavior

### BUFF_SIZE = 0 or absent
If the channel is unbuffered, sending a value blocks the process until the other side executes a receive on the channel. More than one process can send a value on the same channel, in that case they block and wait until the other side receives the value sent by the goroutine.
The same behavior happens for the receive: it blocks until the other side does a send on the same channel.



~~~ text

P2: I want to write 2 into the channel
P1: I want to write 1 into the channel
P4: I want to write 4 into the channel
P3: I want to write 3 into the channel
MAIN: I want to read a from the channel
MAIN: I have read a from the channel
P2: I have written 2 into the channel
MAIN: I want to read b from the channel
MAIN: I have read b from the channel
P1: I have written 1 into the channel
MAIN: I want to read c from the channel
MAIN: I have read c from the channel
P4: I have written 4 into the channel
MAIN: I want to read d from the channel
MAIN: I have read d from the channel
EXIT

~~~

## BUFFERED - Synchronous behavior if buffer not full(for send)/empty(for receive)

### Buffered with BUFF_SIZE = 1
When the channel is buffered, you can write in that channel without blocking the goroutine until the buffer is full. After that, the behavior is the same sa unbuffered channels. When a process reads from the channel's buffer, it decreases the number of "slot" used, releasing the block of one sending goroutine.

Goroutine which executes the Receive can read sequentially all the value contained into the buffer. If the buffer is empty and no other value is waiting to enter into the buffer, the receiving goroutine blocks.

Here there are 2 examples of buffered channel behavior with buffer size set to 1 and 2 respectively.

~~~ text

P2: I want to write 2 into the channel
P2: I have written 2 into the channel
P1: I want to write 1 into the channel
P4: I want to write 4 into the channel
P3: I want to write 3 into the channel
MAIN: I want to read a from the channel
MAIN: I have read a from the channel
P1: I have written 1 into the channel
MAIN: I want to read b from the channel
MAIN: I have read b from the channel
P4: I have written 4 into the channel
MAIN: I want to read c from the channel
MAIN: I have read c from the channel
P3: I have written 3 into the channel
MAIN: I want to read d from the channel
MAIN: I have read d from the channel
EXIT

~~~

### Buffered with BUFF_SIZE = 2

~~~ text

P2: I want to write 2 into the channel
P2: I have written 2 into the channel
P1: I want to write 1 into the channel
P1: I have written 1 into the channel
P4: I want to write 4 into the channel
P3: I want to write 3 into the channel
MAIN: I want to read a from the channel
MAIN: I have read a from the channel
P4: I have written 4 into the channel
MAIN: I want to read b from the channel
MAIN: I have read b from the channel
P3: I have written 3 into the channel
MAIN: I want to read c from the channel
MAIN: I have read c from the channel
MAIN: I want to read d from the channel
MAIN: I have read d from the channel
EXIT

~~~
