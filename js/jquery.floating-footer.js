/**
 * Copyright 2012 Nöll & Kötterheinrich GbR
 *                Garden of Concepts GmbH             
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * jQuery plugin for floating footer
 *
 * Supported and tested browsers:
 *   - IE 7+ (because IE<7 doesn't supports position:fixed)
 *   - Chrome
 *   - Firefox
 *   - Chrome
 *   - Opera
 *
 * @author David Kötterheinrich <David Kötterheinrich> 
 * @author Dennis Oehme <oehme@gardenofconcepts.com>
 */
(function( $ ) {

    "use strict";

    $.fn.floatingFooter = function()
    {
        return this.each(function() {
            var footer = $(this);
            var visible = $('div.visible', this);
            
            $(window).bind('resize scroll', function(e) {
                var clientHeight = $('body').height();
                var height = visible.height();              
                var top = footer.offset().top;
                var scrollTop = getScrollTop() + clientHeight - height;

                if (scrollTop > top) {
                    visible.removeClass('locked');
                } else {
                    visible.addClass('locked');
                }
            }).scroll();     
        });

        /**
         * workaround for Firefox / Opera
         */
        function getScrollTop()
        {
            var target = document.body;
            var scrollTop = 0;

            while (target !== null)  {
                scrollTop += target.scrollTop ? target.scrollTop : 0;
                target = target.parentNode;
            }

            return Math.max(scrollTop, $('body').scrollTop());
        }
    };

})( jQuery );
