L.DropDownButton = L.Control.extend({
    initialize: function(map, layers, position) {
        var toggle = function(btn, show){
            btn.forEach(function(item) {
                if(show)
                    item.enable();
                else
                    item.disable();
            });
        };

        var activeLayer = function(name){
            layers.forEach(function(l){
                if(l.options.name == name){
                    l.addTo(map);
                }
                else
                    map.removeLayer(l);
            });
        };
        
        var mainBtn = L.easyButton({
            id: 'header',
            leafletClasses: true,
            states: [{
                stateName: 'open-buttons',
                icon: 'icon buttonSize',
                title: 'Раскрыть выбор',
                onClick: function(control) {
                    control.state('close-buttons');
                    toggle(btnArray, true);
                }
            }, {
                icon: 'icon buttonSize',
                stateName: 'close-buttons',
                title: 'Скрыть выбор',
                onClick: function(control) {
                    control.state('open-buttons');
                    toggle(btnArray, false);              
                }
            }]
        });
        
        var btnArray = [];
        layers.forEach(function(l){
            btnArray.push(
                L.easyButton('<strong>' + l.options.name + '</strong>',
                function(control, map){
                    activeLayer(l.options.name);
                })
            )
        });

        toggle(btnArray, false);
        var btnBar = L.easyBar((function(){
                var array = [mainBtn];
                btnArray.forEach(function(b){
                    array.push(b);
                });
                return array;
            })(),{ position: position ? position: 'topleft'});

        btnBar.addTo(map);
    }
});