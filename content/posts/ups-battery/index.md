+++
Description = ""
Tags = []
Categories = []
date = '2025-10-31T11:08:33+01:00'
title = "How to replace a UPS battery, the hard way"
featured_image = "feature.jpg"
+++

My homelab needs are pretty simple. Sitting in the closet by the front door, just below the energy meter, is what I call *the Vault*. A single tower PC on a shelf, that runs my entire smarthome. I designed it as an everything in one device - it pulls duty as a NAS, OPNsense router, Jellyfin server and Home Assistant hub, among other things. Single point of failure? Absolutely, which is why I've got a UPS to protect it.

![My Eaton 3S 550](0f35e5.avif)

Enter the solution - this affordable Eaton 3S 550 that I picked up a while ago for I don't remember how many euros. Since it's only got to protect one computer, and we get power cuts almost never here, its only job is to allow it to shutdown safely and protect my data in the unlikely event of an outage. With a USB connection to the machine, it's been reliably sending shutdown commands after about 5 minutes... until recently. It runs on a single sealed lead-acid battery, and after a few years of service, it's in need of replacement.

Sure, I could do that. They're not that expensive, and what price do I put on my precious data anyway? Well... turns out, not much, which is why I embarked upon a journey to upgrade this humble Eaton UPS with the latest battery technology of 2025: LFP cells, LiFePO4 or Lithium iron-phosphate - whichever you prefer. It's the stuff used in a lot of electric cars coming out of China, along with basically home battery storage solutions. While it doesn't offer quite the same level of energy density as your run-of-the-mill lithium ion cells, it makes up for it with its vastly higher number of charge cycles before it dies. If I get this right, it should be the last battery replacement I'll ever need. If I get it wrong, I might set my apartment on fire. What's not to love?

## The feasibility study

As I've not had any experience in building a battery before, I first needed to expand my knowledge on several aspects before I knew if it was viable:

- What's the voltage of the original lead-acid battery, and can I arrange cells to closely match that voltage so the solution will function?
- What's the difference between how a lead-acid and LFP battery is charged, and are they compatible?
- What is the tolerance of the UPS, does it have mechanisms that might flat out reject my modifications?
- While LFP batteries have a much higher energy density, am I able to find cells that will fit nicely into the slot where the old battery went?

Tackling the first few required some searching of internet forums, and here's one of the first articles I ran across, on [DIY solar forums.](https://diysolarforum.com/threads/use-a-lifepo4-battery-pack-inside-ups.12490/) From a voltage perspective, it turns out that as the nominal voltage of LFP cells are around 3.2 volts and placing 4 in series nets us 12.8 volts. Since this is slightly above the 12V we were aiming for, what this mostly likely means is that the maximum voltage of the battery will be higher than the maximum voltage the UPS can provide while charging. This will result in the battery never reaching full charge, but if it plays out right, it could be a benefit to battery health, as permanently pinning a cell to 100% is not good for the chemistry. We'll have to see, as too low could mean we just don't have enough capacity.

An aside here - I found out that LFP was a great choice to go with as the nominal voltage of Li-ion cells are a bit higher at 3.6V. This means it's not possible to get a number near 12V.

Moving on to whether the UPS will work with the new battery, the answer here online was very much "it depends". Much of the concern was less about whether the UPS would function at all (in the end a voltage is a voltage), but more about how the UPS will read the charge level. I can already say that from experience running this for a few months already, the "minutes remaining" counter is completely innacurate now, while the "battery percentage" is more of a vague estimate but seems to reliably know when it's about to hit 0.

Adding on to this, there were some comments on how LFP cells react to the float voltage that is normally applied to a lead-acid battery when sitting at full charge - for lead-acid this is standard practise, while there is a chance that this same mechanism could damage the LFP cells. Nobody mentioned that it would cause any spontaneous combustion or other undesirables, just negative battery health, so I figured I would find out for myself in the long term. So far so good!

Last up, it's time to break out the calipers. This UPS is a fairly compact device, and the compartment for the battery is fairly small. I don't *really* need a lot of battery capacity, just enough to shutdown the machine, more is better, right? I wanted to maximise the use of the space. I've got 90x70x101mm to play with, it's time to see how I could most effectively use the space.

## €€€

At this point I'm fairly sure that this might possibly work, and if it doesn't then I guess I just end up with a battery I can use for other stuff. It was time to find the supplies, grab my wallet and pull the trigger.

First up on the list: the cells themselves. They're going take up the most of the volume, and luckily [NKON](https://www.nkon.nl/) provides everything I could need in this department. I spent hours looking through all the options - I needed something that was not just the right size, but also the right amperage rating to ensure I could meet the ~300 watts or so that I'd need to be able to pull. Also, what's up with UPS providers giving numbers in Volt-Amps? I tested it and I could get it to pull about 300W before it would shut off, so that is what I aimed for. This proved quite tricky to hit gold here, as there were any number of cells with different amp ratings which I could put in parallel, if I had the space.

![12x JGNE 26650 cells](b24a30.avif)

In the end though, gold is exactly what I hit, in the form of the [JGNE 26650 4500mAh - 13.5A LifePO4.](https://www.nkon.nl/jgne-26650-4500mah-13-5a-lifepo4-3-2v.html) At a height of 65.7 mm it fit in the 70mm height of the compartment with enough space above and below for some tabs and insulation, and a rating of 13.5A meant I could put 3 in parallel to hit a theoretical 486W max output, far above the 300W I was aiming for. The only question remained on whether I could fit the fairly girthy 26mm diameter of 12 cells into the space, and I figured with some creativity and maybe some cutting, I could manage it.

But wait, we mustn't forget about a crucial part that also needs to fit into the same space - a Battery Management System! This is critical for balancing the voltages of the cells in the pack while charging. Since my needs were very simple, this [DALY 4S BMS for LiFePO4 off Aliexpress](https://aliexpress.com/item/1005004309259925.html) does the trick. The 40A model is just below the maximum 40.5A that my 3 parallel cell groups can provide. But with dimensions of 48x74x14mm, it's getting really tight inside this enclosure. The only way I'll know for sure is to first buy the BMS and the cells, and just try to stack them inside of the space to find the best orientation.

![Supplies all laid out](428d26.avif)

Finally, it's time for some related supplies. I want to replace the stock spade connectors with a nice XT-60 connector, and I'll also need some nickel strips to get power across the pack. I use the soldering iron to attach the wire leads to the nickel strips before I weld them, so as not to transfer heat into the cells. It's my first time spot welding, so I got this [AWithZ Portable Spot Welder.](aliexpress.com/item/1005008200111859.html) Note that I really don't recommend this to anyone, as you'll see later on.

## Will it fit?

![Cells fitted into the compartment](318331.avif)
Whew, this was a close one. With the cells and the BMS loaded into the compartment, I can actually close the lid! However, it's *really* tight. This is before the strips, insulation and wires are added in, so at this point I'm just praying that I'll still be able to get this back in once I'm done.

## Assembly time

After watching half a dozen Youtube videos and reading safety tips online, it was time to lay down some spot welds. My hands are not as precise as I'd like them to be and I'm painfully aware that until this is hooked up with the BMS in front of it, there's 0 protection against bridging and short circuits. Thankfully LFP batteries are a lot more forgiving and less prone to thermal runaway, so this put my mind at ease.

![The spot welder in action](507874.avif)
I pulled out my new spot welder and some snips, and got to work welding the cells together in this fairly weird arrangement; it was exactly the shape I needed to squeeze this assembly into the compartment. This is where I came across my first stumbling block; after cranking this spot welder to its maximum setting, I was finding the welds themselves to be super weak. I kept welding the same part of the strip over and over again in the hopes of getting a good hold, but this was starting to look less like a battery and more like a homemade bomb by the minute. By the end of it, here's my result, and while I'm happy that I got something functional without causing any major issues, I'm certainly not proud of it.

![Welding result](545bcc.avif)

The next step was to prepare the UPS itself. I snipped off the spade connectors and soldered on my new XT-60 connector, and started to lower the battery assembly into place. I got it a little bit in before realising it wasn't going to fit, at all. In the right side of the compartment was a plastic piece that was originally designed to support the mid top section of the lead-acid battery and prevent it from sliding around. This unfortunately was in the way of the XT-60 connector, which I had not accounted for in the space constraints. Problem-solving time: I hacked it away using the saw on my penknife. Problem solved.

![The new XT60 connector](5724b8.avif)

I was going to need a bit of force to get it in there, and since the fit was so perfect, it would be incredibly difficult to get it back out once fully in. I found some lengths of ribbon and positioned them behind the battery to give me some "tabs" to pull on later.

![The ribbons](7badbc.avif)


Midway through the initial test which I detail below, I pulled this battery out, and peeled back the insulation. I found that several of the strips were basically only being held in place by the tension of the plastic wrap, and once pulled away, they came loose. In fact, a piece fell off and started a short circuit, leading me to almost throwing the entire assembly off the table. I re-did several sections of it with fresh nickel strip and I'm much happier with the result now. No pictures, so you'll just have to trust me.

Overall, lesson learned here is that while I still believe in the philosophy of buying a cheap tool first and replacing it with the expensive one once you know you'll use it a lot, there's definitely a price to be put on safety. Best not to cheap out on the spot welder, and next time I need to do this I'll be replacing it.

## The first test

Now this is the part where I'd love to dazzle you with numbers and graphs, but unfortunately my documentation wasn't as good as my photography skills. This means that I've lost the exact numbers, but I remember the basics off the top of my head.

Before I started on this journey, the first thing to do was to test how it was before. I hooked up my e-bike battery charger and battery to the UPS, got the battery charging at around 200W, and unplugged the UPS from the wall. Since the battery is severely degraded, it went from full to dead in 2 minutes. Since I don't have a fresh battery to test I can't tell you how long that lasts, but the [Eaton technical specification](https://www.eaton.com/content/dam/eaton/products/backup-power-ups-surge-it-power-distribution/backup-power-ups/eaton-3s-ups/eaton-3s-ups-technical-specifications.pdf) suggests that a 200W load would last for 6 minutes. I suspect that this value is on the conservative side, however.

After installing the new battery, giving it a day to charge up and running the same test, I got the UPS to run for a whopping 18 minutes! And then, it unceremoniously shut off. No lights, nothing. The device was completely unresponsive.

Picking the UPS up, it was hot. VERY hot. The battery itself was warm which is to be expected, but I could smell some very toasty electronics inside the main compartment. My theory here has to be that the thermal solution for this UPS was not designed to run for this long, as there is no active cooling for the electronics inside.

![Inside the unit](367ce5.avif)

I started to diagnose the issue, fearing that I'd killed it. This was the moment I pulled the battery back out, and re-worked the nickel strips. I'm unsure whether the BMS cut out or whether the UPS itself hit a thermal limit, but once I put the battery back in an hour later, it fired back up and ran for a further 5 minutes before stopping. This time it was the UPS reporting the battery was empty, much to my relief.

So while I can theoretically run this at 200W for 23 minutes on one charge, for safety reasons I've decided to not let it run for more than 10 minutes. Luckily this can easily be configured in the `apcupsd` tool on the server, so it will shutdown either when the battery level is low, or after 10 minutes running on battery - whichever comes first.

## So, what did I learn?

I learned that yes, it's very possible to upgrade a 12V sealed lead-acid UPS to LiFePO4 chemistry! However, I leave it up to you to decide whether the risk of running a modified UPS is worth it depending on what it is you're trying to protect. I think I was maybe a little ambitious with the battery capacity, and while it's awesome to have a UPS that can run for so much longer, I'm not able to actually use that full capacity due to heat issues. I could have run 8 cells with 2 parallel groups, and still had enough maximum amperage to meet my 300W target. UPSs generally have no need to charge their batteries quickly, but in this new configuration it takes several days to reach its maximum charge.

Still, I'm very pleased with just how perfectly these cells fit into the existing enclosure, and honestly it was just luck that I managed to get the cover on top. It's now back in the closet, sitting on top of the Vault, and I don't need to worry about it again.

Or maybe I should. When I get a new spot welder for my next project that needs it, it might be time to open it back up again and see how well those spot welds are holding up.
