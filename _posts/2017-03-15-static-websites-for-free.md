---
layout: post
title: 'Static Websites for Free'
section: 'Blog'
image: 
  url: '/assets/images/emptywallet.svg'
  alt: 'Empty Wallet'
---

Are you the type of person who thinks that the only way to get something done properly is to do it yourself? Are you willing to roll your sleeves up and get building from scratch? With the advent of a large variety of online hosting services, using the correct combination of them can let you host a static website for absolutely nothing. In a [previous post](/blog/2016/look-a-new-website), I covered a quick and cheap way to run a static website, but since then I've refined on the idea and come up with a solution that takes the cost from pennies per month to... nothing.

### Tell me your secrets!
Not so fas-- Well, alright then. It's already been discovered before, and I'm not a magical wizard - I'm using [GitHub Pages](https://pages.github.com){:target="_blank"}. Now, GitHub Pages doesn't offer HTTPS, so what gives? Put [Cloudflare](https://www.cloudflare.com){:target="_blank"} over the top of that, and you're off to the races. *I've been watching a little too much LinusTechTips... He uses that term all the time...*

The prerequisites for this: 1) You either use [Jekyll](https://jekyllrb.com){:target="_blank"} or for some reason you're crafting every page by hand (who the hell has time for that? Is this the 80s?) and 2) You're ok with putting the source code for your website up for the world to see. There's not much of a downside to this; it's not like you're hiding any private information back there. Also, you'll need a free Cloudflare account that still has two pagerules available.

This is not a guide on how to use Jekyll, or GitHub, or Cloudflare. There's many other guides out there that will do this, I'm just showing you how to tie them all together.

### ...What's the catch?
Well, there's a few limitations. First of all, unless you're comfortable messing around with GitHub a lot, you'll most likely be using the GH's integrated Jekyll Generator. This generator runs in safe mode, as in it won't let you run any custom plugins your fancy site might need. It does have a good selection of inbuilt ones though, and the upside to all this is that you don't need to worry about generating the site - just push to GitHub and it's online!

Second of all, Cloudflare is acting as a cache. Depending on how aggressively you set that cache, changes you submit to GitHub won't show instantly unless you manually flush the cache. This is a problem with almost all caches, and as long as it's not time-sensitive, your new blog post can wait a few hours.

This is the biggie: There's many free website creators out there, and if you don't know how to HTML, then you better go use that. Your website is going to be looking like this while you create it:
![Index Page Jekyll Code](/assets/images/indexsnap.jpg){:.float-center}

But hey, at least you won't have advertisements plastered all over it! You're fully in control.

### Let's get down to business.
First of all, you're going to need a GitHub account. Then you're going to need to learn the basics of Git. Go learn it yourself. Then, you're going to need a Cloudflare account.

Next step is to get creating! Download the Jekyll program, and create your website. Use Git for version control, and go wild. Create the site of your dreams. Don't even think about publishing that sucker to GitHub until it's looking like something. You can use Jekyll's inbuilt webserver to view your changes on the fly in your own computer.

Then, you're going to upload to git and follow [this guide here](https://blog.cloudflare.com/secure-and-fast-github-pages-with-cloudflare){:target="_blank"}.

### Hey! That's cheating! Aren't you going to explain the rest?
No. Too bad. There's no point in me duplicating and plagiarising someone else's work - I've covered the reasons why and why not, and the very helpful Junade Ali over at Cloudflare has all the technical details for you.

If you want proof that this method works... Well, as of right now, you're staring right at it! I'm always on the hunt for the Next Big Thing™ so maybe I'll find a better way to host it. If you remember my post on [IPFS](/blog/2016/decentralising-files), my next idea is to try and host this website on that platform. There's a few challenges to overcome; Cloudflare is very much based in a HTTP world, but as the technology matures, I'll get there. As it stands right now, I've got the streamlined build process of GitHub, combined with all the edge nodes and caching of Cloudflare - for nothing. Cool, right?

*[GH]: GitHub
*[HTTP]: HyperText Transfer Protocol
*[IPFS]: InterPlanetary File System
