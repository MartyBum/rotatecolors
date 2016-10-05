Ext.namespace('Zarafa.plugins.rotatecolors');

/**
 * @class Zarafa.plugins.rotatecolors.RotateColorsPlugin
 * @extends Zarafa.core.ThemePlugin
 *
 */ 
Zarafa.plugins.rotatecolors.RotateColorsPlugin  = Ext.extend(Zarafa.core.ThemePlugin, {
     

    initPlugin : function() {
    	
    	// Add a new class to the body
    	document.body.className += " rotatecolors";  	
    	
    	// Register insertion point in settings
    	this.registerInsertionPoint('context.settings.category.general', this.RotateColorsSettingsWidget, this);
    	document.getElementsByClassName("rotatecolors")[0].style.WebkitFilter = "hue-rotate("+container.getSettingsModel().get('zarafa/v1/contexts/mail/rotate_colors_value')+"deg)";
   
    	
    	var oldOnHierarchyLoad = Zarafa.onHierarchyLoad;
    	Zarafa.onHierarchyLoad = function(){
    		oldOnHierarchyLoad.apply(Zarafa, arguments);
    		
    		// Add classes to the divs we want to exclude
    		document.getElementById("zarafa-navigationpanel").className += ' norotate';
    		document.getElementById("zarafa-mainpanel").className += ' norotate';
    				
    		var newVal = container.getSettingsModel().get('zarafa/v1/contexts/mail/rotate_colors_value');	
    		
    		// Norotate class should get a negative value
        	document.getElementsByClassName("norotate")[0].style.WebkitFilter = "hue-rotate(-"+newVal+"deg)";    	
        	document.getElementsByClassName("norotate")[1].style.WebkitFilter = "hue-rotate(-"+newVal+"deg)"; 
    				
    	};
    	
    	
    },

    RotateColorsSettingsWidget : function() {
		return {
			xtype : 'rotatecolors.rotatecolorssettingswidget'
		}
	}
    
});

Zarafa.onReady(function() {
	container.registerPlugin(new Zarafa.core.PluginMetaData({
		name : 'rotatecolors',
		displayName : _('Rotate Colors'),
		allowUserDisable : false,
		allowUserVisible : false,
		pluginConstructor : Zarafa.plugins.rotatecolors.RotateColorsPlugin
	}));
});



