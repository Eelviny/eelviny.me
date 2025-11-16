+++
Description = ""
Tags = []
Categories = []
menu = "main"
date = '2025-11-16T19:15:07+01:00'
title = "Making a smart(ish) washing machine"
featured_image = "feature.jpg"
+++

I hate the idea of smart home appliances. Things like your fridge, dishwasher, oven, or microwave. The thing is, it's not about the idea of them being smart, but just purely the implementation that all manufacturers are following on a home device that's meant to be reliable for 5, 10, or maybe even more years. That means that unlike a lot of other devices in a smart home, if properly maintained, they could outlive the current new hotness when it comes to smart home control. However, if you add the smart-ness yourself, you can upgrade it down the line without replacing the appliance. Here's what I did to add some intelligence to my trusty Samsung washing machine.

![The washing machine in question](fb96f2.avif)

Now this Samsung WW80K5410UW1 8 kg 1400 RPM washing machine has served me very well over the years, but it doesn't win any awards on claiming to be the best machine. The simple reason I own it is that it was a good deal at the outlet and in my limited price-range when I and my former roommate first moved into our apartment together. I wanted to make sure I invested enough to not have to replace it in a few years, and at €600, it's been a great investment, running strong for over 6 years now. When I got it, it had a UK plug (for context, I live in the Netherlands), and it was obvious that water had leaked onto it in the warehouse as all accessories and manuals came wet, with a nice layer of mold. Lovely.

Still, it's been a workhorse. The best little innovation it has is the ability to set a time that the washing machine load will _finish_ at, and it will figure out what time it needs to start. For the most part, I can't think of much more automation you'd want to have out of the thing, because in the end, you're going to need to be there to load and unload it anyway. Seeing the ability to start and stop a washing machine cycle from a fun cloud-connected app just doesn't have any appeal to me.

Having said that, there are certainly advantages to being able to start the machine remotely. For my use case, I just care that it finishes the job sometime today, and I have a variable price energy contract. It would be great if the washing machine could only start running when the price of electricity is low, but how can I do that with a machine that doesn't connect to some fancy cloud provided by the manufacturer? The answer is surprisingly simple and I'm not the first person to come up with it. It takes advantage of almost all washing machine's ability to recover from a power loss, and resume the cycle.

The theory is simple. Load the washing machine, and then press the start button. Immediately after doing so, cut the power to the machine. Later, when you restore the power, the machine will resume from where it left off (the very beginning), and continue through to the end. To do this efficiently, you need a way to detect when a washing machine cycle starts, and then a way to control the power to the machine. Now there are a million smart plugs on the market that you can put between the wall socket and the plug of the device, and they can monitor and control power. But why not take it a step further, and embed that functionality directly into the machine? Then you don't need a big smart plug taking up space on the wall.

![The inside](c408b8.avif)

So that's exactly what I did. Pulling the lid off the washing machine revealed just how much space there was inside to work with. And at the back right, was the incoming power from the power cord. With a small amount of work, and the right device, it'll be possible to splice it into the incoming power, to both monitor and control it. My device of choice for this was the [Shelly Plus 1PM.](https://www.shelly.com/products/shelly-plus-1pm) This was a couple years ago so this exact model is not available anymore, but later models will perform exactly the same. While I definitely could have run it just fine and connected it to Home Assistant using the stock firmware, I'm a massive fan of the ESPHome project, and I specifically chose this device due to the fact it uses an ESP32 microcontroller at it's heart, and other people have already done the hard work of making it function.

![The guts of the Shelly](5220d7.avif)

Note that the device I'm showing above is actually the Shelly Plus i4 that I use elsewhere as that's all I took pictures of, but the process is about the same. Internally the device has a GPIO header that exposes the necessary pins to power up the board and flash a new firmware, but I didn't have a male connector of the right pin pitch to connect with it. Luckly, the wires inside of a solid core RJ45 ethernet cable are just the right size, and what I had on hand. I soldered a tiny little jig together to connect it to a USB serial device, and we're off to the races.

![Installing it](cfed7c.avif)

With the device running ESPHome, it's time to put it into the machine. This part was super simple but a little nerve-wracking; I'd really like to not break the thing that keeps my clothes clean. There was plenty of slack in the wires internally which was perfect, so I cut the main incoming power wires and placed the Shelly inline. I didn't get a picture but after the initial tests, I then drilled a small hole in the metal casing of the washing machine, and drove a screw through the plastic casing of the Shelly to attach it to the machine. This is super important as washing machines have a LOT of vibration, and you don't want a live wire to come loose.

![Home Assistant power graph](6f1029.avif)

After the hardware was in place, it was time to automate it. With power consumption data flowing into ESPHome, I came back to it after using it a few times to review it. On this particular day we ran the washing machine twice, first starting at 09:00, then again at 10:15. The power gives a great indication of the stages it goes through, with the vast majority of the power being used to heat the water during the first washing stage. But what we're interested when it's off, it consumes about 0.3W at idle. When the machine is started, it starts drawing above 10W.

![Home Assistant automation](a3c8bf.avif)

Sometimes it's useful to start the washing machine regardless if you need the washing done ASAP, so I built a "Washing Machine Force On" Switch in Home Assistant. The automation first starts by checking if the power of the machine goes above 10W. If it does, and the switch is off, and also price of power right now is above 20% of the highest price today, the machine will instantly turn off. The automation will then wait until the energy price drops (or it gets forced on), then turn on the washing machine again.

The most important part is that while the machine is running, it consistently stays above 10W. This means that the automation does not get triggered again, as this could cause it to turn off mid-cycle if the energy price rises. Once it starts, we want it to complete.

And that's it! While of course you can achieve the same results with a standard smart plug, using the internal Shelly certainly makes for a much cleaner setup. And while it would be cool to be able to automate more of the machine, like choosing settings etc, this is a compromise I'm happy to make to keep local control of the appliance without a vendor's cloud, and also allow me to change or reverse it later on down the line if something better comes along. However, the reality is that on a variable price energy contract alone, this is probably not saving that much money. The main reason I installed the Shelly was so that I could simply monitor its power usage, and the idea for automating the start came later. I can imagine that if you live in a home with solar or battery storage, this could make a much more noticeable difference, as the cost difference between the high and low of a variable energy contract is far less than the cost of grid energy vs free solar.

Oh, and by the way, the best feature of a Samsung washing machine has to be the tune it makes when it finishes. It makes me happy every time.

<iframe width="560" height="315" src="https://www.youtube.com/embed/IAoVDOkNq3k?si=ljZb4m0Gx-TiglKs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
