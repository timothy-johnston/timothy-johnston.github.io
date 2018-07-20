---
layout: post
title:  "How I Built a Cat-Detecting Twitter Bot"
date:   2018-07-17 20:45:42 -0400
categories: jekyll update
---

Recently, I built a cat-detecting, picture-taking, and tweet-tweeting Raspberry Pi / Twitter bot called [ThirstyCat][thirsty-cat]. This is a Twitter bot that automatically takes a photo of my sweet cat Shasta and posts it to Twitter each time she takes a drink from her water bowl. I had been wanting to put together a project utilizing not only programming but also hardware/electronics for a while, and I also had been wanting to share pictures of my cat with random people on the Internet for a while. Thus, ThirstyCat was born. This post covers how I built this project - feel free to use this as a guide to build your own, or use it as inspiration to build something different!

## Description
ThirstyCat uses a force-senstive resistor (FSR) and Raspberry Pi B+ to detect when Shasta approaches her water bowl. Since the FSR itsself is very small, I placed it underneath a larger platform (okay, a cheap cutting board) set in front of the water bowl. This way, any time the cat walks towards the bowl a force is applied to the FSR, even if its not being directly stepped on. A Pi Cam connected to the Pi is then triggered to take a picture.

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

## Lets Build It!
The process is pretty straight-forward. I'll try to make it more straight-forward with lots of pictures.

1. Plug the analog to digital converter and Pi Cobbler into the breadboard.























Thanks for checking out my blog – this is actually my very first post! This entry is a beginner’s guide to setting up a basic webpage using GitHub pages.

GitHub pages is a service that allows you to host web pages directly out of a GitHub repository. User’s can create pages specifically for some project, or they can create a personal page to be used as a portfolio, blog, etc. In part II of this post, coming next weekend, we’ll utilize Jekyll with GitHub pages to create a lightweight and customizable blog.

Lets build our webpage. We’ll begin by making a new GitHub repository (you’ll need an existing GitHub account – [Join GitHub][join-github]). Click the “+” symbol on the top right of your home page and select new repository. Since you’re making your personal page, name your repository <yourUsername>.github.io. Give it a short description if you’d like. I chose to initialize my repository with a README file – you don’t have to do this. When finished, click the green Create repository button.

![Make new repository]({{ "/assets/makeNewRepository.png" | absolute_url }})

Next, clone your newly-created repository to your local machine. Click the green Clone or download button on the right side of the page, and then click the clipboard icon to the right of the URL in the dropdown.

![Clone repository]({{ "/assets/cloneRepository.png" | absolute_url }})

Now the real fun begins! Lets head to the terminal. Enter the command git clone {{"<"}} the URL you just copied>. 

![Enter clone command]({{ "/assets/enterCloneCommand.png" | abosolute_url }})

You’ll see some terminal output before you’re prompted to enter another command. Go ahead and cd itno the the directory that was created and enter the command git remote -v to confirm your remote repository was established as expected. You should see two lines of output that look something like this:

![Verify remote]({{ "/assets/verifyRemote.png" | absolute_url }})

Your repository is all set up! Now, lets put some content on your page. Fire up a new file named index.html in your text editor of choice and add some HTML. You can start as simple as typing “Hello world!”, or you can follow my basic example using this HTML and CSS: 

{% highlight html %}
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="myPage.css">
</head>

<body>
    <h1>Hello world!</h1>
    <h2>Welcome to my page!</h2>
    <span>
        <p>Enjoy this comic:</p>
        <img src="https://imgs.xkcd.com/comics/cat_proximity.png" alt="xkcd comic">
    </span>
</body>
{% endhighlight %}

{% highlight css %}
h1 {
    color: #4286f4;
}

h2 {
    color: #f42929;
}

span {
    display:inline-block;
}

p {
    text-align:center;
}
{% endhighlight %}

Now that you’ve got some content put together, push it to GitHub. Enter the following commands:

    - git add -A
    - git commit -m “added index.html”
    - git push -u origin master

Navigate to https://{{"<"}} yourUsername>.github.io. You’ll see that your changes are live. Congrats, you now have your own webpage! If you used the code snippets above, it will look like this: 

![Example page]({{ "/assets/webpageExample.png" | absolute_url }})

While the xkcd comic used in our example is funny (and scientifically accurate - I speak from experience), you're ready to customize your page and add in some of your own awesome content. New to web development and nervous about HTML and CSS? There aren't many better places to start than [freeCodeCamp][freecodecamp]. Good luck, and, most importantly, have fun!

Check back soon for Part II: Use Jekyll & GitHub Pages to Make a Blog


[join-github]: https://github.com/join
[freecodecamp]: https://www.freecodecamp.org/
[fsr-guide]: https://acaird.github.io/computers/2015/01/07/raspberry-pi-fsr
