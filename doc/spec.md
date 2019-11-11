dynlayers
=========

Generic multi purpose layer infrastructure. Can be used everywhere where a layer architecture is needed.
Provides a library to be used embedded, as well as a service which can be installed as component
and dynamically be used.

Layer hooks can define 'competences' as API. Implementations can then be latched in with the right order by exposing 
the APIs it implements.

##dynamic stack
Depending on the device and the environment different layers can be applied. Especially the kind of node, 
reliant or souvereign, will result in a different layer stack.

##dynamic routing
Depending on the command/action and the target, the routing thru the layers can be adopted.
E.g. for different kind of data, entities, log or stream data, different (persistence) DB's can
be selected. 
e.g. use different persistent stores for logs, entities and events

##dynamic dynamic
All features described above are also dynamic again. This means depending on conditions e.g. 
change of screen size, available network, updated libraries, some (or even all) layers can be reloaded or 
exchanged.
