---
layout: post
title:  "How I Built a Cat-Detecting Twitter Bot"
date:   2018-07-17 20:45:42 -0400
categories: jekyll update
---

Recently, I built a cat-detecting, picture-taking, and tweet-tweeting Raspberry Pi / Twitter bot called [ThirstyCat][thirsty-cat]. This is a Twitter bot that automatically takes a photo of my sweet cat Shasta and posts it to Twitter each time she takes a drink from her water bowl. I had been wanting to put together a project utilizing not only programming but also hardware/electronics for a while, and I also had been wanting to share pictures of my cat with random people on the Internet for a while. Thus, ThirstyCat was born. This post covers how I built this project - feel free to use this as a guide to build your own, or use it as inspiration to build something different!

## Description
ThirstyCat uses a force-senstive resistor (FSR) and Raspberry Pi B+ to detect when Shasta approaches her water bowl. Since the FSR itself is very small, I placed it underneath a larger platform (okay, a cheap cutting board) set in front of the water bowl. This way, any time the cat walks towards the bowl a force is applied to the FSR, even if its not being directly stepped on. A Pi Cam connected to the Pi is then triggered to take a picture.

The system is controlled with a script written in Python, and it uses the Tweepy library to communicate with the Twitter API. Within the Python script is a force threshold value - whenever the platform is stepped on, the values coming back from the FSR increase and exceed the threshold. This triggers the Pi Cam to take a picture, and then that picture is automatically tweeted. Here's an example Tweet!

<div style = "display:flex; justify-content:center;">
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Alert, cat detected! Shasta just took a drink.<br>Time:  2018-07-14 14:30:45.368819<br>Number of drinks today:  2 <a href="https://t.co/hwkccpVNuR">pic.twitter.com/hwkccpVNuR</a></p>&mdash; ThirstyCat (@TheThirstyCat) <a href="https://twitter.com/TheThirstyCat/status/1018201202738257920?ref_src=twsrc%5Etfw">July 14, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

Before getting in to the details, I want to give a major shoutout to Andrew Caird. His guide on how to [use a force sensitive resistor with a Raspberry Pi][fsr-guide] was tremendously helpful to me.

## Materials
* Raspberry Pi B+
* Force-sensitive resistor
* Breadboard
* Pi Cobbler
* MCP3008 analog to digital converter
* Ribbon cable
* 10k Ohm resistor
* Male/male jumper wires

In terms of software, I used Python 2.7.3, Tweepy, and the Adafruit_MCP3008 library. 

## Lets Build It
The process is pretty straight-forward. I'll try to make it more straight-forward with lots of pictures.

Plug the analog to digital converter and Pi Cobbler into the breadboard.
![Converter and Cobbler]({{ "/assets/build TC 1.JPG" | absolute_url }})

Refer to the wiring diagrams provided by Adafruit ([more info here)][adafruit-page]. Don't worry that the cobbler and converter are in different locations than the picture of my own setup - what's important here is to connect the MCP3008's pins to the correct Cobbler pins according to the following:
* MCP3008 Pin -> Cobbler Pin
* MCP3008 VDD -> 3.3V 
* MCP3008 VREF -> 3.3V 
* MCP3008 AGND -> GND 
* MCP3008 CLK -> #18 
* MCP3008 DOUT -> #23 
* MCP3008 DIN -> #24 
* MCP3008 CS -> #25 
* MCP3008 DGND -> GND 

![MCP3008 Pin Diagram]({{ "/assets/build TC 8.gif" | absolute_url }})
![Wiring Diagram Zoomed Out]({{ "/assets/build TC 5.pnc" | absolute_url }})
![Wiring Diagram Zoomed In]({{ "/assets/build TC 4.pnc" | absolute_url }})
![Connect pins]({{ "/assets/build TC 2.JPG" | absolute_url }})

Here is the only tricky part. Connect the FSR and the 10k Ohm resistor to the breadboard. See the picture below:  The FSR goes in a free location on the breadboard. Use a jumper wire to connect one of the FSR leads to Channel 0 on the MCP3008. Then use the 10k Ohm resistor to connect that same location to the ground on the opposite side of the breadboard. Finally, use a jumper wire to connect the 2nd FSR lead to the power rail on the FSR's side of the breadboard.

![Connect FSR]({{ "/assets/build TC 7.png" | absolute_url }})

Smooth sailing from here on out. Connect the breadboard to the Pi using the ribbon cable. 

![Connect FSR]({{ "/assets/build TC 3.JPG" | absolute_url }})

Finally, connect the Pi Cam to the Pi. I didn't take a picture of this part, but a quick Google search will give you lots of guides on that.


## Lets Use It
At this point, if you've been building your own, you've got a working force sensor. What you do with it now is up to you! Head to the [project on GitHub][github-page] to check out my source code to read in values from the FSR, implement logic based on those readings, and interface with Twitter. Feel free to fork, offer suggestions, and/or do your own thing with it. 

Thanks for reading!
![Me with cat]({{ "/assets/build TC 0.JPG" | absolute_url }})

[thirsty-cat]: https://twitter.com/TheThirstyCat
[fsr-guide]: https://acaird.github.io/computers/2015/01/07/raspberry-pi-fsr
[adafruit-page]: https://learn.adafruit.com/reading-a-analog-in-and-controlling-audio-volume-with-the-raspberry-pi/connecting-the-cobbler-to-a-mcp3008
[github-page]: https://github.com/timothy-johnston/ThirstyCat/blob/master/scratchinCat.py
