---
title: Decentralising Files
date: 2016-09-28 00:00:00 Z
categories:
- source
layout: post
section: Blog
image:
  url: "/assets/images/ipfs-logo.png"
  alt: IPFS Logo
---

With school over and a gap year ahead of me, I started to get a little bored. Working at a retail store isn't fun, but messing around with the next generation of web technologies certainly is!

A while ago, like the nerd I am, I started dreaming of ways that would make internet a little bit faster. Why couldn't ISPs just cache the important, static stuff instead of fetching it from a different network on a peering agreement each time?
The answer to this is SSL. Since each connection is encrypted end-to-end, with a different key for each connection, nothing can be cached like that. Instead, ISPs and all other networks have to fetch it from the main source each time.

### Enter IPFS. 
It's been great fun to mess around with it. While many other technologies focus on giving an all-in-one package for persistent, decentralised storage solutions, IPFS does none of that. Instead, it offers to be a direct, (kinda) drop-in replacement for HTTP, which allows for anyone, anywhere to cache and share content. IPFS stands simply for InterPlanetary File System, and it does exactly that. All a computer needs is connection to one other peer in the network, and it allows them to connect to everyone else using DHT - the same technology as Bittorrent, but on a much larger scale.

#### Great, so what does this actually do for me?
Good that you asked! Imagine you're on some obscure website, on the 5th page of Google, looking for an answer to that one really obscure computer problem you have. (Alright, nobody gets to the 5th page, but bear with me) You try to load up that webpage but you find that part of the website has gone offline! All the pictures were hosted on some even more obscure image hosting site that went offline a week ago.

But imagine that some other guy loaded up the same site a month ago. With HTTP, that means nothing. With IPFS, this guy has just become your saviour. You go to question the IPFS network for those pictures, and this guy's computer responds, pushing the pictures across the internet to you, and voila, your problems are solved.

#### That just sounds like a grand scheme to get viruses...
How wrong you are. HTTP only ever sends you to the location of some data. Imagine if the hoster of this content then decides to subtely change it... There's nothing you can do. Our version of the internet merely provides addresses to the location of content, but gives no way to address the content itself. If this were the case of IPFS, then yes, the "guy" could in theory just push a virus across to you.

But IPFS doesn't work like that. When a file is added to the network, a hash is created. This hash becomes the address of the file, and changing the file means the hash would also change. The sender sends you some data, and you check that the hash of the file matches up to the address that you asked for. If the two match up, you've got the exact file that you asked for. This allows for anyone, anywhere to become not only consumers of content, but also hosters, and nobody has to trust each other. You're asking for the data itself, and if the wrong data is sent, then it is simply rejected.

`QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG`

This is an example of an address. This is a hash of IPFS's readme file, and this is what is used to find the file you need. Here's the steps undertaken:
1. Connect to a peer in the network. Using DHT, find more peers in the network.
2. Ask the network for this hash, and find the closest peer with this file.
3. Download the data from this peer.
4. Create a hash from this data. If the hash matches the one we were asking for, then everything is great! Otherwise, reject the data.

### Accepting Limitations
This system allows for any machine, anywhere, to request files from any other machine, regardless of whether the original uploader is still hosting the file. This means that the more popular a file is, the more available it is to other peers. However, it does not solve the problem of availability completely. If nobody wants a file, then nobody will store it on their machine... and then it's gone, forever. However, if there is a website that you treasure, you can always preserve it in its original form, by simply keeping a copy!

The next thing to remember is that, just like HTTP, this is basically a file system. It can store static files; no more, no less. I run my website on static files, and this would work perfectly in an IPFS setting, and I may even do that in the near future. Facebook isn't exactly going to be able to migrate to an entirely decentralised solution overnight though - Centralisation is needed to keep user account secure, for example. You don't want every peer in the network to hold the keys to the castle. 

But it is a perfect replacement for CDNs. Imagine a CDN for static files run for the users, by the users. No need for fancy edge servers, or datacentres, just the users with their PCs turned on all over the world. You might be fetching a picture from your neighbor at 100x the speed of collecting it from a datacentre on the other side of the country.

### The Full Circle
Back to what I was talking about at the beginning. For ISPs, this means a great deal. Data is encrypted from peer to peer by default, but what if the ISP becomes a peer? It can hold a vast array of data in its own datacentres, instead of relying on third parties to provide it. This means dramatic cost-cutting on peering agreements, and hopefully savings for customers... Though you're probably out of luck if you're a Comcast subscriber. Good to know someone's benefitting from it though.

Anyway, this article hasn't gone into many of the technical elements of the system, but more the potential use cases for such an idea. I'm a dreamer, and hope to see these technologies take over someday. If you want to start using it today though, just head over to the [IPFS website](https://ipfs.io/)! And yes, you can also get to the website through IPFS, as well as HTTP.

*[IPFS]: InterPlanetary File System
*[HTTP]: HyperText Transfer Protocol
*[DHT]: Distributed Hash Table
