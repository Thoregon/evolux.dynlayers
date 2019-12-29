dynlayers
=========

Generic multi purpose layer infrastructure. Can be used everywhere where a layer architecture is needed.
Provides a library to be used embedded, as well as a service which can be installed as component
and dynamically be used.
 
Implements concepts of a workflow like forks, syncs and sequences, but 
also defines the way back. The way back can be immediate, means the lowest layer reached provides
the result, but also may bubble up all (or some) layers. the mid layers may add or modify the result.

Uses concepts from AMQP between two layers, like fanout routing (to every queue bound), 
direct (route based on conditions) and topic exchange.

Layer hooks can define 'competences' as API. Implementations can then be latched in with the right order by exposing 
the APIs it implements.

The right order must be defined by those composing the layers.

Allows creation of arbitrarily structured middleware.

##dynamic stack
Depending on the device and the environment different layers can be applied. Especially the kind of node, 
reliant or sovereign, will result in a different layer stack.

````js
const layers = universe.evolux.layers;
const builder = layers.builder;

const eventstore = builder.name('EventStore')
     .

    .build();

const snapstots = builder.name('Snapshots')
     .

    .build();

````

##dynamic routing
Depending on the command/action and the target, the routing thru the layers can be adopted.
E.g. for different kind of data, entities, log or stream data, different (persistence) DB's can
be selected. 
e.g. use different persistent stores for logs, entities and events

##dynamic dynamic
All features described above are also dynamic again. This means depending on conditions e.g. 
change of screen size, available network, updated libraries, some (or even all) layers can be reloaded or 
exchanged.
