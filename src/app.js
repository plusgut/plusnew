/*
                  VOOD
       very object oriented design
                 ,
               ._  \/, ,|_
               -\| \|;|,'_
               `_\|\|;/-.
                `_\\|/._
               ,'__   __`.
              / /_ | | _\ \
             / ((o)| |(o)) \
             |  `--/ \--'  |
       ,--.   `.   '-'   ,'
      (O..O)    `.uuuuu,'
       \==/     _|nnnnn|_
      .'||`. ,-' \_____/ `-.
       _||,-'      | |      `.
      (__)  _,-.   ; |   .'.  `.
      (___)'   |__/___\__|  \(__)
      (__)     :::::::::::  (___)
        ||    :::::::::::::  (__)
        ||    :::::::::::::
             __|   | | _ |__
            (_(_(_,' '._)_)_)
*/

import Obj from 'vood/obj/class';
import objHelper from 'vood/obj/helper';
import Controller from 'vood/controller/class';
import controllerHelper from 'vood/controller/helper';
import Helper from 'vood/helper/class';
import helperHelper from 'vood/helper/helper';
import adapterHelper from 'vood/helper/adapter';
import routerHelper from 'vood/helper/router';
import utilHelper from 'vood/util/helper';
import utilRunloop from 'vood/util/runloop';
import View from 'vood/view/class';
import viewHelper from 'vood/view/helper';
import Template from 'vood/template/class';
import templateHelper from 'vood/template/helper';

var vood = Obj({
	////-----------------------------------------------------------------------------------------
	// abstract class of everything
	Obj: Obj,
	////-----------------------------------------------------------------------------------------
	// a list of prefixes of all modules which should be loaded
	types: [ 'obj', 'util', 'view', 'controller', 'mixin', 'widget', 'helper' ],
	////-----------------------------------------------------------------------------------------
	// Overwriting of core-modules and calling inits of modules
	init: function( opt ){
		console.log( 'Can I haz some voods?' );
		_.merge( vood, opt );
		this.executeInit();
	},
	////-----------------------------------------------------------------------------------------
	// returns instances of fitting controllers
	find: function( path ){
		return this.controllerHelper.find( path );
	},
	////-----------------------------------------------------------------------------------------
	// calls inits of the core-modules
	executeInit: function(){
		for( var index in this ){
			if( _.isObject( this[ index ] ) && _.isFunction( this[index].init )){
				this[index].init();
			}
		}
	},
	////-----------------------------------------------------------------------------------------
	// making slashes into camelcase
	transform: function( name, prefix ){
		var transform = '',
			upper     = false;
		name          = name.replace( prefix, '' );

		for( var index in name ){
			if( name.hasOwnProperty( index )){
				var character = name[ index ];
				// i don't want to write slashes to access core components, so its camelcase
				if( character == '/' ){
					upper = true;
				}
				else if( upper ){
					// When the rest ends with class, then just make it uppercase and stop the rest of transformation
					if( name.substr( index, name.length - 1 ) == 'class' ){
						transform = transform.capitalize();
						break;
					}
					transform += character.toUpperCase();
					upper = false;
				}
				else {
					transform += character;
				}
			}
		}

		return transform;
	},
});


window.vood = vood;

vood.objHelper        = objHelper;
vood.Controller       = Controller;
vood.controllerHelper = controllerHelper;
vood.Helper           = Helper;
vood.helperHelper     = helperHelper;
vood.adapterHelper    = adapterHelper;
vood.routerHelper     = routerHelper;
vood.utilHelper       = utilHelper;
vood.utilRunloop      = utilRunloop;
vood.View             = View;
vood.viewHelper       = viewHelper;
vood.Template         = Template;
vood.templateHelper   = templateHelper;

export default vood;