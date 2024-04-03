export default (state, action) => {
    switch (action.type) {
        case 'CHANGE_VALUE_PARTICIPANTS':
            return {
                ...state,
                ...action.newValueCVP
            }
        case 'GET_VALUE_PARTICIPANTS':
            const participants = action.payload
            let studentIds = []
            let leaderIds = []
            if (participants.students && participants.students.length > 0) {
                studentIds = participants.students.map(item => item.id)
            } else if (participants.leader && participants.leader.length > 0) {
                leaderIds = participants.leader.map(item => item.id)
            }

            return {
                ...state,
                student_ids: studentIds,
                render_student_ids: participants.students && participants.students.length > 0 ? participants.students : [],
                leader_ids: leaderIds,
                render_leader_ids: participants.leader && participants.leader.length > 0 ? participants.leader : []
            }
        case 'REMOVE_VALUE_PARTICIPANTS':

            return {
                ...state,
                student_ids: [],
                render_student_ids: [],
                leader_ids: [],
                render_leader_ids: []
            }
        case 'GET_VALUE_PARTICIPANTS_IN_LOCALSTORAGE':
            const participantsGVPIL = action.payload

            return {
                ...state,
                student_ids: participantsGVPIL.student_ids,
                render_student_ids: participantsGVPIL.render_student_ids && participantsGVPIL.render_student_ids.length > 0 ? participantsGVPIL.render_student_ids : [],
                leader_ids: participantsGVPIL.leader_ids,
                render_leader_ids: participantsGVPIL.render_leader_ids && participantsGVPIL.render_leader_ids.length > 0 ? participantsGVPIL.render_leader_ids : []
            }
        default:
            break;
    }
}