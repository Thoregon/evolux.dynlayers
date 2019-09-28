dynlayers
=========

Generic multi purpose layer infrastructure. can be used everywhere where a layer architekture is needed.

##dynamic stack
Depending on the device and the enviroment different layers can be applied. Especially the kind of node, 
reliant or souvereign, will result in a different layer stack.

##dynamic routing
Depending on the command/action and the target, the routing thru the layers can be adopted.
E.g. for diffent kind of data, entities, log or stream data, differnt (persitence) DB's can
be selected. 
e.g. use different persistent stores for logs, entities and events

##dynamic dynamic
All features described above are also dynamic again. This means depending on conditions e.g. 
change of screen size, available network, updated libraries, some (or even all) layers can be reloaded or 
exchanged.
