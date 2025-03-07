/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.getCore().loadLibrary("sap.ui.unified");sap.ui.define(["sap/ui/core/Element","./library","sap/ui/unified/library"],function(e,a,p){"use strict";var r=p.CalendarIntervalType;var t=p.CalendarAppointmentHeight;var n=e.extend("sap.m.PlanningCalendarView",{metadata:{library:"sap.m",properties:{key:{type:"string",group:"Data",defaultValue:null},intervalType:{type:"sap.ui.unified.CalendarIntervalType",group:"Appearance",defaultValue:r.Hour},description:{type:"string",group:"Data"},intervalsS:{type:"int",group:"Appearance",defaultValue:6},intervalsM:{type:"int",group:"Appearance",defaultValue:8},intervalsL:{type:"int",group:"Appearance",defaultValue:12},showSubIntervals:{type:"boolean",group:"Appearance",defaultValue:false},appointmentHeight:{type:"sap.ui.unified.CalendarAppointmentHeight",group:"Appearance",defaultValue:t.Regular}}}});return n});
//# sourceMappingURL=PlanningCalendarView.js.map