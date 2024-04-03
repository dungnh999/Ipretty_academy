import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import timelinePlugin from '@fullcalendar/timeline'
import listPlugin from '@fullcalendar/list'

export const calendarProps = {
    locale: 'vi',
    firstDay: 1,
    plugins: [timelinePlugin, dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, ],
    headerToolbar: {
        // left: 'prev,next,today',
        // center: 'title',
        // right: 'year,dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    views: {
        dayGridMonth: {
            titleFormat: {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }
        },
        listMonth: {
            allDayText: 'Cả ngày'
        },
        timeGridDay: {
            allDayText: 'Cả ngày'
        },
        timeGridWeek: {
            allDayText: 'Cả ngày'
        },
        year: {
            type: 'timelineYear',
            // buttonText: 'Năm',
            dateIncrement: {
                years: 1
            },
            slotDuration: {
                months: 1
            },
        }
    },
    contentHeight: 600,
    buttonText: {
      today: 'Today',
    },
    titleFormat: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    },
    initialView: 'dayGridMonth',
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        meridiem: false
    },
    displayEventTime: true,
}