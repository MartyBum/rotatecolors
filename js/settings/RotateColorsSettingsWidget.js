Ext.namespace('Zarafa.plugins.rotatecolors');
 

Zarafa.plugins.rotatecolors.RotateColorsSettingsWidget = Ext.extend(Zarafa.settings.ui.SettingsWidget, {

	/**
	 * @constructor
	 * @param {Object} config Configuration object
	 */
	constructor : function(config)
	{
		config = config || {};

		Ext.applyIf(config, {
			height : 100,
			title : _('Rotate Colors'),
			xtype : 'rotatecolors.rotatecolorssettingswidget',
			items : [{
				xtype : 'slider',
				name : 'zarafa/v1/contexts/mail/rotate_colors_value',
				increment: 1,
				minValue: 0,
				maxValue: 360,
				ref : 'rotatecolorsbox',
				columnWidth : 0.5,
				width : 600,
				style:'margin-right:10px',
				listeners: {
			        change: this.onChange,
			        scope: this
			    }
			}],
		});
		
     Zarafa.plugins.rotatecolors.RotateColorsSettingsWidget.superclass.constructor.call(this, config);
    },
    
    onChange : function(slider, newVal) {
        // Change the css
    	document.getElementsByClassName("rotatecolors")[0].style.WebkitFilter = "hue-rotate("+newVal+"deg)";
    	
    	// Norotate class should get a negative value
    	document.getElementsByClassName("norotate")[0].style.WebkitFilter = "hue-rotate(-"+newVal+"deg)";    	
    	document.getElementsByClassName("norotate")[1].style.WebkitFilter = "hue-rotate(-"+newVal+"deg)";
    	
    
    	if ( this.model.get(this.rotatecolorsbox.name) !== newVal ){
    		this.model.set(this.rotatecolorsbox.name, newVal);
    	}
    	    	
    },
    
    update : function(settingsmodel){
    	this.model = settingsmodel;
    	this.rotatecolorsbox.setValue(this.model.get(this.rotatecolorsbox.name));
    }
});

Ext.reg('rotatecolors.rotatecolorssettingswidget', Zarafa.plugins.rotatecolors.RotateColorsSettingsWidget);