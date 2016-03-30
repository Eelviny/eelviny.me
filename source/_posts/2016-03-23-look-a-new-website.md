---
layout: post
title: 'Look! A new website'
section: 'Blog'
image: 
  url: '/assets/images/csscode.png'
  alt: 'Snippet of CSS'
---

Time to get out of the free, but restricting grasp of Tumblr. It's a great service - don't get me wrong, but the style of blogging makes it feel more like your average social network with a few more advanced features bolted on.
The solution? **Make your own!**

So, in the true Blue Peter style, here's a website I made earlier. Well, when I say earlier, I mean sort of *now* earlier. Sure, it's a little rough around the edges still, and there's still bits missing, but it's a website nonetheless!

### What's it running?
![Jekyll](/assets/images/jekyll.png){:.float-center}

My two criteria for this website were that I wanted it to be fast, and I wanted it to be cheap. To meet my simple, yet difficult in practise critera, I settled on [Jekyll](https://jekyllrb.com/). Jekyll is an open-source static site generator that allows you to create a very complex setup, that automagically transforms it into simple files that can be hosted on anything - no server processing needed. Just build the site on your home PC and upload the files it spits out the other end! In case you've been living under a technological rock, a static site generator creates the site once, and the files are simply served as is (hence the term 'static'). There's no fancy PHP or webserver needed, simply something that can host files.

It took a bit of a getting used to - coming from a background of full-blown CMS implementations, not being given a control panel was a bit of a change! Time to crack the knuckles, roll up the sleeves, cue the music and get programming instead. I quickly found that the underlying programming language, Ruby, is a joy to use and I've not gone back from it since.

### How's it running?
Actually, this is something I would love to cover in detail in a future post. But for now, I'll tell you this: [Amazon AWS](https://aws.amazon.com) is simply perfect for low-traffic websites such as this one, and a combination of the right tools from AWS will get anything done. I use Amazon S3 to hold all the static files, which is then passed to Cloudfront which distributes the files and deals with the SSL certificate. Finally, I topped it off with Route 53, simply because I'm dissatisfied with NameCheap's DNS configuration service. All this and I'm spending about 50p per month right now - The "pay for what you use" model means it could increase in the future.

Anyway, I hope you like it! It's taken way too much time that I could have used doing more useful things, such as coursework. But it's been fun to do.

*[AWS]: Amazon Web Services
*[S3]: Simple Storage Service
*[SSL]: Secure Sockets Layer
*[CMS]: Content Management Service
*[DNS]: Domain Name System
