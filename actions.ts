import { ActionTree } from 'vuex'
import { RootState } from 'src/store/root-state'
import { employeesService } from 'src/store/employees/employeesService'
import { HrState } from 'src/store/hr/index'
import { ResourceInPeriod } from 'src/store/employees/state'
import { LineCreation, LineKey, Period } from 'src/store/projects/types'
import { hrService } from 'src/store/hr/hrService'

export const actions: ActionTree<HrState, RootState> = {
  async getEmployeesHr({ commit }, period: Period) {
    const employees = await employeesService.fetchEmployees(period)
    commit('SetHrEmployees', employees)

    return employees
  },

  async getProjectEmployeesHr({ commit }, data: ResourceInPeriod) {
    const { resourceId } = data
    const projects = await employeesService.fetchProjectsEmployeeHr(data)

    const commitData = {
      resourceId: resourceId,
      projects: projects.data
    }

    commit('SetProjectsToEmployeeHr', commitData)
    return commitData
  },
  // eslint-disable-next-line
  async addProjectToEmployeeHr({ commit }, data: LineCreation) {
    return await employeesService.addProjectToEmployeeHr(data)
  },
}
