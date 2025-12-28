+++
Description = ""
Tags = []
Categories = []
menu = "main"
title = "Monitoring my home through my kitchen cabinets"
date = '2025-12-28T13:29:52+01:00'
featured_image = "feature.jpg"
+++

![Result first](8eae97.avif)

When you go **full** smarthome and start adding a million devices, the second challenge you tend to encounter is how to interface with all of them. Sure, your Home Assistant is full of a big list of everything, but scrolling through it just to find that one light or sensor can be a bit of a chore. For viewing stats about the house, I opted to install a e-ink display on my kitchen cabinets which is visible from the living room. I can see the temperature inside and outside of the house, along with the time and current power usage. There's plenty more things it can support, but for me these are the basics that I want to be able to see at a moment's notice.

It wasn't without its iterations on the design. It all started with an Inkplate 10 that I bought a couple years ago, at the eye-watering price of over €200. The price is most part due to the European manufacturing, the sourcing of used Kindle displays that this product relies on, and the low volume nature. Overall though I'm super supportive of what these folks are doing, and while you could certainly make something way cheaper with a standard LCD panel hooked up to a Raspberry Pi, I love the look of the e-ink panel as it works without emitting any light.

![The first iteration](67100b.avif)

In my previous apartment, I just took the included 3D printed case and a USB-C cable, and just double sided taped it to the side of the cabinet. This side faces out into the open-plan living room area, and you can see that I hadn't quite developed the interface as much back then. Still, it performed its function admirably for me living alone in my little bachelor pad, but I'll be the first to admit that the black case and cable sticking out the side aren't the most aethestically pleasing.

I don't have pictures of it unfortunately, but I actually upgraded this setup later. My apartment came with this wall panel that was nothing more than a terrible interface to connect with the rest of the wireless thermostats in the place. It had a neat trick of detaching from the wall and using battery power, but when it ran out of battery it made me realise that the apartment would work just fine without it there. Since there was a standard wall cavity with AC wires in the back, I took the rear part of a smart switch that I experimented with and ultimately never used, and hacked a hole in the back of the 3D printed case of the Inkplate to fit it. The smart switch wall mount included a small 5V power supply, which allowed me to wire it directly to the Inkplate and replace the wall-mounted display with my own.

As I started returning the rental apartment back to its old state, ripping out all the modifications I had made everywhere, the Inkplate came off the wall too. I didn't know how it would be possible to integrate it into my new apartment, and the original case now had a big hole ripped into the back of it, so I wanted something that was a lot nicer to look at while being self-standing. After doing a little bit of measurement, I bought a nice oak wood picture frame off a website which also provided custom sized inner "bezels" that I could match perfectly to the Inkplate. The frame also included accomodations for thicker art pieces with the ability to stand them off further from the glass, which I reversed to allow me to fit the increased thickness of the Inkplate PCB in there.

![In frame](e83736.avif)

Here's the finished result at this point, and with a nearby wall outlet, I can get this thing powered! As the USB C port potrudes out the side of the Inkplate I opted to instead snip the end off a random 5V power supply I had lying around, and solder it directly to the pads provided on the PCB. I then drilled a small hole in the rear of the frame, nice and discreet.

![No overhead cabinets](88f1f5.avif)

We move on to moving time. The moment we got keys to our newly constructed apartment, the first thing we realised is that there are zero overhead cabinets in the kitchen; just a big space where you would expect them to be. I'm disappointed but not surprised to see that they cheaped out on this, so of course we headed off to everyone's favourite place, IKEA, to assemble and install our own. As part of this build I wanted to install an LED light strip on the underside of the unit to illuminate the countertops, and of course I wanted those lights to be smart. I also had this nicely framed Inkplate that would be great on the side of the cabinets facing out into the living room, so I thought: why not combine it all into one? There's some spare GPIO available on the PCB, and with an addition of a good enough power supply and a couple MOSFETs, I should be able to integrate the lights and display seamlessly into the unit.

The light strip I want to use is a combination warm/cool strip from Auxmer and runs on 24V, but the Inkplate has neither a 24V power input nor MOSFETs to drive the strips. 

![The PCB render](b711ba.avif)

For a different project I had made these little 5-channel 24V LED strip PCBs, here's a render of the populated board. It has space for 5 MOSFETs, a small 24V to 5V buck converter, and an ESP32. I populated 2 of the 5 MOSFETs and left the ESP32 space empty, instead double-sided taping the PCB to the back of the inkplate and adding a few small wires to deliver the 5V to the inkplate, and the two GPIOs I needed back to the PCB. With that, we now have a combination e-ink display and LED strip driver. Also, I wanted to include a button in the cabinet to turn the lights on and off, and I had a nice metal push button lying around that was perfect for the job.

![The button wires](1db16c.avif)
![Pushing the button](fe489f.avif)

I picked up this 30 degree LED profile from ClarumLED, allowing me to mount the LED strip along the back of the cabinet, against the wall. For the power supply, I bought a SANPU unit and just stuck it on top of the cabinet, making it not possible to see or access from the ground. After that, I drilled a button-sized hole in the front right of the cabinet - it's nice and hidden, but easy to press if you know where it is.

![The power supply](efb1ad.avif)
![The wire layout](dd730c.avif)

The final challenge was to now wire the four pieces together in an invisible way; the power supply, inkplate, LED strip and button. IKEA makes colour-matched end pieces to go on the side of cabinets, which was perfect for me. I assembled everything onto this end piece, by screwing into the frame from the back of the panel, then using a router to cut slots in the back of it to run wires from the power supply on top of the cabinet, via the inkplate, and down to the LED and buttons. Once the panel is mounted to the side of the cabinets, everything becomes invisible and leaves the Inkplate floating in the middle with no visible wires. Additionally, because the LED strip is mounted at the rear, the power wires are able to come out from the bottom right of the panel, directly down into the profile.

The last part was running AC power to power it all. I toyed with the idea of cutting a channel in the wall and tapping into the power socket below to make it invisible, but ultimately decided against it as it adds some extra electrical safety considerations and this is a rental apartment, and I didn't like the idea of undoing that work when moving out! To keep it as minimal as possible I opted to just run a power cable from the power socket, up the left side of the cupboard. While we did put the cabinets flush against the left wall, the corner is very much not 90 degrees (new constructions cutting corners and being sloppy as ever) so there was actually enough space near the back to snake the cable up the side.

![The final result](82fe3b.avif)

And here's the final result! The e-ink display gives some stats on temperature and humidity in different rooms of the apartment, while fetching weather data from Home Assistant, along with power usage. Ignore the "nan" on the living room, I haven't set up a sensor for that room yet... It's the main clock in the living room, with the display partially refreshing once a minute and doing a full refresh on the hour. I've been running this display for about two years now, which means this display has done over 2 x 365 x 24 x 60 = 1051200 refreshes. At over a million refreshes, partial or otherwise, the display is slowly starting to fail around the edges, with the ink slowly starting to bleed inwards. I contacted Soldered (the makers of Inkplate) about a replacement display but as they are sourcing theirs from breaking down kindles, they don't sell just the e-ink panel. They did however tell me which model numbers I should look up online to purchase. Still, if you're looking to replicate something for yourself, I would recommend trying to come up with a system to either detect if people are home or just disable it at night to cut down on the number of refreshes, as once per minute all day every day is very much past what these displays are rated for long-term.

A little while ago while I was flashing an ESPHome update, a bug popped up in [the Inkplate module](https://github.com/esphome/issues/issues/7076) that left my setup in a crash loop state that I was unable to get into safe mode for. As I mounted this display by screwing it in from behind the panel and provided no way to reach the USB-C port or other serial access from the outside, to fix it I had to disassemble the whole thing just to re-flash it manually with the fix. As this is all a bit of a PITA, I've decided to just keep rocking this failing panel until the bitter end! Still, now it's working fine, it's best to just set & forget.

 But the best part of this is how seamlessly I've got it integrated with the rest of my smarthome. From the outside you can't tell that the display and lights are all part of the same system, and using Home Assistant and a Shelly behind the light switches, I have the lights on the cabinet turn on and off in sync with the overhead kitchen light, fully illuminating the space. Now, if only I could do something about the "dumb" inbuilt light on the cooker hood... A project for next time.
