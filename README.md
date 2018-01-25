# Pond Of Slime
## A little pond where I share some interesting info with CEO
To make life easier, there are few things I would like to clarifly before we step into the world of computer.
Some of them you may already know, some may be new to you and some maybe not the same as you knew before.
Anyway, please seat back and read with some spare time.
Ofcause, if you dont want to read, just move onto your js is ok.
### READ READ READ READ the god damn book!
Please execuse me for my poor English proficiency, as you always know, my English SUCKS....

*Read the god damn book!* is what I always heard from my college teacher. He once said, reading non-friction is boring, especially something technical or something you simply have no interest in. But reading, is a must. This is the door way to open a whole new world. Later when you growth up, reading those insurance policy, college prospectus :books: will make you fainted in just 3 sec. however, you **MUST** read and read in detail because that will save your life a million times in the future and you wont regert reading it at the first time.

Enough BS, now get back on track. To help you better understanding or do whatever you would like to do with Discord, web, graphic etc, some computer terms you better have some fundermental understanding, or at least, know what people are talking about.

This world is a strange place, most people like to say some Mars language to make them feel good about themself, but not the computer world, actually the world of computer is very simple.

#### ~ HardWare ~

- Computer Hardware

  - A computer is a piece of hardware, something you can touch actually, ***ALL*** computer makeup of *Input OutPut Device* and *CPU*. No exception as of year 2018! (your phone is a computer too!, even the rice cooker is a computer made up of CPU and Storage!)
  
    - **Input Output Device**, is simply a piece of hardware you interact with a computer, a keyboard is an input device, a monitor is an output decice, a headphone is an output device too!
   
    - **CPU**, Central Processing Unit, this is where your big computer case enclosed, inside a CPU, you will find the **Processing unit** and the **Storage Unit**
   
      - **Processing Unit**, (a semiconductor chip, or just simply a piece of metal which do all the calculation, it really, just around your little finger nail size) :stuck_out_tongue: 
      
      - **Storage**, Storage is where the CPU storage information, it is just like the plate to hold food when you do cooking and another plate after you do cooking. To hold information rather it is temporary or for a long period of time. Simply remember, CPU DONT remember anything! it just process data, like if you want the computer to do calculation 1 + 2, you will need a storage to store the value 1 and 2 as well as the result storage holding value 3, the CPU just do the adding job by taking 1 and 2 from storage add them and put back to storage for result.
      
        - Storage usually catagorized by the speed of response, i.e. how fast the CPU can read/write information to it. some will retain information after you remove the power while some will not. I.e. *RAM, Random Accessing Memory* (usually people saying, I have 8G memory in my computer, is actually refering to this) can only hold information when power on, once you turn off the computer, information lost. *HardDisk* (usually people saying Drive C, Drive D) can hold large amount of data and *RETAIN* information even power removed!
        
### Why all the BS?

Why waste your time to tell you all these junks? This is because it has huge relationship with computer programming. You may see tons of programming language in this world, Java Script, JSON, Python, C, Basic ..... so on and so on... but to the computer, there is ONE and only *ONE* language (should called **instruction** actually, computer only listen to instruction, not language) called, ***Machine Code***

Remember I told you before that the Processing Unit DONT remember anything? Worst is that the powerful computer nowadays can only do four things, they are: *Add*, *Subtract*, *Shifting* and *Move* data between storage. (**Note:** Shifting means move bit left and right, you may not know binary yet, computer store information in binary actually not decimal in human world, 1 and 0, if it need to store value 2, then it will need two space, to store 1,0, 10 in binary means 2, not 10 (ten) in our world, if you interested in what is binary, you will need to do some search in google, I dont go too far off here)

Since computer only understand ***Machine CODE***, therefore actually all so-called programming language will finially **complied** back to Machine Code so that the computer can understand and run, no matter how fancy those programming language look like to humanbeings.

For example when you write a JS code:
```
var Z = 1 + 2
```
will be complied and finially stored physically in memory as machine code:
```
1000000 10010100, 10000000 10001010,00000000 00000001, 00000000 00000010
```
same machine code will be generated even you write your program in C++ language:
```
unsigned short z = 1 + 2;
```
or any other kind of programming languages.

The Machine Code above is CPU ***dependent*** (it means iMac and PC will have different no. on same hardware instruction) and first two value (instruction) between comma is an ADD instruction, then followed with a PUSH instruction and then two value 1 and 2, it just tell the CPU to ADD (machine code: 10000000 10010100), PUSH to ***Address***(machine code:10000000 10001010), value 1(00000000 00000001), value 2(00000000 00000010) or in human terms, **add** 1 and 2 together and **move** the result value to memory address 10001010. We simplfily the instruction here for easy understanding, actual machine code is more complex.

As you can see, Machine Code is not for human to understand, therefore, you see tons of programming language around the world. They all serve the same purpose (or claim), to make life easier or to make human easier on expressing their thinking into computer instruction.
So whenever you see programming language/script, they have a complier program at the backend, no matter they are precomplie or complie in runtime (means complie while the programe is running), the job for a program complier is to translate the code back to Machine Language. While you got all the errors, syntax errors, etc. It doesnt necessary means you are not doing the right job, that is only means the complier dont understand what you are trying to say (this should be the problem of those who develop the computer language like java, c++ etc, because of thier dumb skills and not smart enough, now we need to learn *THEIR* way to program the computer to work, and different programming language have different syntax, different ways to call functions..... so tired of it)

#### ~ Addressing ~

One thing you will need to understand before do programming is ***Addressing***, this is just like an address in real world. If someone need to send you a mail, they need to know your address. In computer world this is refer to **Where to put in memory/storage**, it is just like line 1 column 2 in your paper note book, in the above example may be to ask CEO (CPU) to do a task of adding 1 and 2 together and write down in your paper notebook line 1 column 2.

All program need you to *Define/Declare* variables before you can use it, this is an action of giving a call sign to a Storage address, like:
```
var Z = 1
```
then the complier will automatically assign an *Storage/Memory address* for you to use with a label Z in this case since it is always hard to memoried the physical address of memory (i.e. 00000000 10001010 instead of Z) :smile:

#### ~ Function ~

A *FUNCTION* is actually a combination of line of code that perform a specific functions like a function for cook noodle, in real life to cook a noodle may need the following steps:
```
1 Find the noodle I want in storage
2 Take off the packing
3 take out the pod
4 put water in the pod
5 boil water
6 put in noodle after water boiled
7 wait for 5 minute
8 taste if the noodle is ready or cook longer
9 put noodle in my choice of bowl
10 deliver the noodle
```
then the function CookNoodle can make our coding life easier by making a function:
```
1 function CookNoodle(WHO,FAVIOUR,BOWL){
2       ask WHO to do the task, (pi in this case)
3       Find the noodle I want in storage (FAVIOUR)
4       Take off the packing
5       take out the pod
6       put water in the pod
7       boil water
8       put in noodle after water boiled
9       wait for 5 minute
10      taste if the noodle is ready or cook longer
11      put noodle in my choice of bowl (BOWL)
12 }
```
A *Library* is a collection of functions, say a Math library may have random, roundup, squareroot functions.

As I mentioned before, people in this world is very strange, they like to use fancy word to show they are different from others but sometime these action make people new to this trade confuse a lot. Whenever you see DLL (dynamic link library), API etc, actually they are all library, a collection of functions. Dont be scared by them.

Also those Object Oriented program is just a conceptual different with traditional programming, it only help people to think more logically when coding (which I dont think so) and make simple task more complicated to complete, code harder to understand etc. But eventually, all code will be translated back to Machine Code for computer to run.

#### ~ Server ~

You may always heard *Server*, what is a server actually? It is a program in a remote computer actually. When you type a URL (web address) in your browser, your browser send a **request** to the remote computer and the *Server* program running in that remote server take the request from you then deliver a web page file from the remote computer harddisk (storage) back to your browser to display. This is why that kind of program called a *Server*. The Server program running at remote computer called *Remote Server*, while the Server program running in your PC called *Local Server*

#### ~ DataBase ~

A database is simply a program to look for information in a file in a storage. (i.e. a file contains information stored in harddisk) For easy finding information or *Records*, usually you will need to define *Fields* for your data record to better serve the purpose:
```
Record BooksInfo:
Field 1 Book Title
Field 2 Book Author
Field 3 Book ISBN Number
Field 4 Book Price
Field 5 Book Language
......
```
In your Discord bot case, that is 
