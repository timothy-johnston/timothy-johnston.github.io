---
layout: post
title:  "Create A Personal Webpage/Blog, Part I: Use GitHub Pages to Make a Webpage"
date:   2018-07-15 15:45:42 -0400
categories: jekyll update
---
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
