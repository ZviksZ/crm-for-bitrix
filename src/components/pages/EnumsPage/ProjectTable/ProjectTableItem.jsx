import React, {useEffect, useState}  from 'react';
import {formatDate, numberWithSpace} from "../../../../helpers/utils.js";
import {ProjectTableStatus}          from "./ProjectTableStatus.jsx";

export const ProjectTableItem = ({item, projectStatuses, openProjectMemberForm, groupEnum, getGroupInfo}) => {
   let start = formatDate(item.start);
   let finish;
   if (!item.finish) {
      finish = 'н.в.'
   } else {
      finish = formatDate(item.finish);
   }
   const [client, setClient] = useState(item.client)
   const [period, setPeriod] = useState('')

   /*let clientItem = groupEnum.find(i => i.id == item.client)
   let client = clientItem?.title || item.client*/

   useEffect(() => {

      let clientItem = groupEnum.find(i => i.id == item.client)

      if (clientItem) {
         setClient(clientItem?.title)
      } else {
         setClient('Не указан')
         //getGroupInfo(item.client).then(res => setClient(res?.data?.title || item.client))
      }



      let periodItem = [{id: 1, title: 'Разовый'}, {id: 2, title: 'Ежемесячный'}].find(i => i.id === item.period)

      if (periodItem) {
         setPeriod(periodItem?.title)
      } else {
         setPeriod('-')
      }

   }, [item, setClient])
   let budget = numberWithSpace(item.budget)
   return (
      <tr onClick={() => openProjectMemberForm(item, 'changeBudget', 'Изменить бюджет')}>
         <td className="open-link">
            <a href={item.link} onClick={event => event.stopPropagation()} target="_blank" rel="noopener noreferrer">{item.title} <i className="icon-open-in-new-default"></i></a>
         </td>
         <td>{client}</td>
         <td>{start} - {finish}</td>
         <td>
            <ProjectTableStatus status={item.status} projectStatuses={projectStatuses}/>
         </td>
         <td className="budget" >

            {budget} &#8381;
         </td>
         <td>
            {period}
         </td>
         <td className="hoverText hoverTextBig">
            <span><i className="icon-baseline-edit-24px-default"></i> Изменить бюджет</span>
         </td>
      </tr>
   )
}

