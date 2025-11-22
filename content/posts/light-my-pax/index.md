+++
Description = ""
Tags = []
Categories = []
menu = "main"
title = "Light My PAX: Integrating smart lighting into my wardrobe"
date = '2025-11-22T18:41:01+01:00'
featured_image = "feature.jpg"
+++

Picture the situation: your alarm's gone off at 5am, you're re-thinking all your life choices that lead to setting it to 5am, and you've now got to get yourself dressed without annoying your partner on the way out. You could get your phone light and fumble around, or you could spend many hours integrating smart lighting into the sides of your wardrobe to give you some soft illumination while you search for the clothes you probably should have laid out the evening before. Naturally, I chose option B, and here's how I did it.

![Final result first](94d1dc.avif)

There's a very high chance that I own the same wardrobe as you. It's an IKEA PAX system, with white sides and faux-wood shelves. It stores the majority of the clothes owned by the both of us. Not much more to say here really. IKEA does have some innovative solutions to add lighting, such as [these overhead lights,](https://www.ikea.com/nl/en/p/ytberg-cabinet-lighting-black-dimmable-60527891/) or these [under-shelf light bars,](https://www.ikea.com/nl/en/cat/pax-wardrobe-lighting-42242/) but at the end of the day, these solutions need to be designed to be easy for the average layperson to add onto their existing wardrobe or cupboards. As such, they either need batteries, or have separate wires and smart remotes.

## Bring on the light

I've gotten pretty handy with LED light strips and an ESP32, so I thought why not integrate my own solution? I'm aiming to have a continuous bar of light running throughout the entire wardrobe, and there's a nice little bit of space under the units to hide the electronics. I did originally consider running a light bar in the shelves themselves, but ultimately shelved the idea (geddit?) as it added a massive amount of wiring complexity and removes the ability to move the shelves around. By running an LED strip up the sides of the unit, I only needed to connect it at the bottom.

![Example of the light](d08080.avif)

We're going to start with the LED strips themselves. To fit them into the sides, I need to cut a channel so that the LEDs are inset and don't interfere with the shelves. But the sides of the PAX unit are really not that thick, with less than 2cm to work with in total. On top of this, I want to have a nice continuous bar of light. There's two ways to achieve this: either inset the LEDs deep enough with a diffuser layer to make it appear as one, or buy LED strips that have the LEDs much closer together.

In the end I settled on the [Auxmer COB LED strip;](https://aliexpress.com/item/1005005967259602.html) I've been using Auxmer strips in all my lighting for years now and they've always no variance in color, a high CRI and I've not had one LED fail on me. Thanks to [QuinLED](https://quinled.info/2020/03/29/premium-quality-white-led-strip/) for recommending them! These strips are able to produce both warm and cold white in one strip, in theory allowing me to choose the colour temperature from Home Assistant. Most importantly the COB LEDs allow me to mount them in the not-very-deep space while looking nice when seen directly, as is the case here.

These lights can produce a bit of heat, and I would like to not just have the bare LED strip visible. Next up was finding a nice profile that I could fit inside the small depth constraints, so I picked up the [LINEA10 profile from LEDProfiel.](https://www.ledprofiel.nl/linea10-10mm-verzonken-led-profiel-1m-2m.html) With a depth of 6.8mm, I'll have enough depth in the wood to cut a channel for it. The top of the profile does sit above the surface by less than a millimeter, but this didn't cause too much of an issue for the shelves.

## The point of no return

![Cutting the channels](f8164f.avif)

To fit the profile, we need a channel. My major concern in this project was that IKEA furniture is already on the razor edge of "strong enough", and by cutting a big channel into the piece, it could lose its structural integrity. Choosing where to cut was very important, to make sure that the light shows well while not getting in the way of anything else. I chose to go about 20cm in from the front of the unit, and made sure with my router to only cut out the part that was going to be visible. There's still a bit of untouched wood at the top and bottom, and I'm hoping that this is enough to make sure the piece doesn't just snap down the channel line.

The LED profiles I bought came in a nice long 2 meter length, but this is a 236cm tall unit. This means I needed to hide a seam somewhere as I joined the two pieces together. The diffuser panel came in a much longer roll, so this meant I could have that as a continuous piece. I opted to place the seam near the top of the unit, where it should be hidden by shelves and other things if you look up. I was going for a snug fit so I could have the profile held in by friction, so it took a bit of touching up with the router and copious hammering to get it in there, but here's the final result:

![Partially assembled wardrobe](5b5115.avif)

Honestly, I couldn't be happier with this. Just running it on the workbench it already looked incredible, but it was going to be a while longer before I saw the final result. I was actually preparing to move house and was taking the opportunity to implemement these strips while I had the wardrobe in pieces anyway, so in the meantime, it was time to move on to the controller.

## The brains of the operation

In terms of where to put it, this was simple. There's a good 5-10cm gap under the unit which is just empty, so I can mount both the power supply and ESPHome-powered PCB to the bottom, and drill upwards to thread wires to the strips. This [SANPU 150W 24V](https://aliexpress.com/item/32720540793.html) model is a bit overkill but we hadn't yet decided if we were going to buy a third PAX unit in the new house, so I made sure to account for the extra power needed if that was the case. In the end it wasn't needed, but hey, you can't tell when it's nicely screwed to the bottom of the unit!

By this point I would say I had enough PCB design knowledge to be dangerous, so I designed a little PCB that was built around the [Waveshare ESP32-C6 development board,](https://www.waveshare.com/product/esp32-c6-pico.htm) chosen due to its copious amounts of I/O. When you do the math, we're running a total of 8 channels - we have 2 PAX units with 2 strips each, and each strip has both cold white and warm white, totalling 8 PWM signals. This particular development board uses an I/O expander which doesn't support PWM, so I needed to be careful to choose pins connected directly to the ESP32-C6 microcontroller for the light strips. I'll also be including some switches that will take up some of the other pins, which I'll get back to later.

![KiCad design](af33c4.avif)

Here's the PCB in question. I had actually designed it originally with a total of 12 channels to take into account the possible third unit, but when we decided against it, I didn't bother to redesign it. In the final PCB I simply omitted the 4 MOSFETs that would have driven those strips. There's a little 24V-5V buck converter onboard, along with plenty of solder pads to connect up other I/O directly. Most importantly, the screw holes along the edge will allow me to secure the board to the underside of the unit.

![The assembled board](541f51.avif)

With the PCB assembled and secured to the bottom of the unit along with the power supply, it was time to get wiring. As I've got one brain but two units, there was a slight bit of complexity in getting the wires running from one unit to the other. Future me will regret the decision I made here; I decided to just drill a hole near the rear of both, line them up, and run the wires directly with no connector. It means I'll have to desolder or cut them if I want to take it back apart in the future, but I'm not regretting it at the moment, so what's the problem? ;)

![Door switch](2087fe.avif)

Finally, I need some way to have the lights automatically come on when the door is opened. The solution is simple and discrete - with these micro switches, I can run a few small wires up right at the bottom of the unit and have the door push them closed. I just used some double-sided foam adhesive to position them, and they're rock-solid. This filled up all the other IO on the board nicely.

## Everything was going smoothly until it wasn't

With everything in place, it was time to load up ESPHome and give it a spin! And this is where I'd love to tell you things went great, but it was only at this final stage in the implementation did I uncover a critical flaw. You see, I had failed to look into specifications of the particular ESP32-C6 device I was using, and if I had, it would have saved me a lot of headache and cost. While the ESP32-C6 is perfectly capable of outputting a PWM signal on many of its pins (and I tested this on **one** of the strips beforehand), it only actually supports a maximum of 6 PWM generators. This useful tidbit of information is included under section [4.2.1.9 of the ESP32-C6 datasheet,](https://documentation.espressif.com/esp32-c6_datasheet_en.html) which I probably should have read more closely. This manifested itself in me getting super confused why randomly two of the eight LED channels was acting all over the place, sometimes going in sync with a different channel, and sometimes not working at all.

In the end I decided to compromise, and cut the number of channels in half by only using the warm white channels of each of the strips. This still looks great, but it's a shame there's some wasted potential here. I did consider ordering the [Waveshare ESP32-S3 development board](https://www.waveshare.com/product/mcu-tools/development-boards/esp32/esp32-s3-dev-kit-n8r8.htm) as it's a drop-in replacement and the ESP32-S3 does 
support 8 channels total, but it simply wasn't worth taking apart our entire bedroom to get access under the wardrobes to replace it.

## The final result

![The final final result](c30f91.avif)

Overall though I'm super happy with how this turned out. Once the units were fully assembled, my concerns of compromising the structural integrity went away, as the shelves nicely transfer the weight to evenly across the boards. With full ESPHome control I've also got them hooked into our home-wide [adaptive lighting setup,](https://github.com/basnijholt/adaptive-lighting) so when you do set that 5am alarm, the lights come on at a much lower brightness to prevent flash-banging my partner and I! With all the electronics neatly hidden under the unit, and the bars recessed into the sides, I'm confident enough to say that it looks like it came out of the factory that way. It's been happily lighting our clothes for almost a year now, and I really hope it continues this way for many more, as getting access for maintenance is an absolute pain.
