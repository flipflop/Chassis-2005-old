$.fn.listHandlers = function(events, outputFunction) {
    return this.each(function(i){
        var elem = this,
            dEvents = $(this).data('events');
        if (!dEvents) {return;}
        $.each(dEvents, function(name, handler){
            if((new RegExp('^(' + (events === '*' ? '.+' : events.replace(',','|').replace(/^on/i,'')) + ')$' ,'i')).test(name)) {
               $.each(handler, function(i,handler){
                   outputFunction(elem, '\n' + i + ': [' + name + '] : ' + handler );
               });
           }
        });
    });
};

/*
 * Examples :
 *
 * List all onclick handlers of all anchor elements:
 * $('a').listHandlers('onclick', console.info);
 *
 * List all handlers for all events of all elements:
 * $('*').listHandlers('*', console.info);
 *
*/
