package com.lazykeru.tpwebjavaimt.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonServiceIMPL implements EmployeeService {
	@Autowired
	private PersonRepository personRepository;
	public long createEmployee(EmployeeDetails employeeDetails) {
		return personRepository.save(employeeDetails).getId();
	}
	public EmployeeDetails getEmployee(long id) {
		return personRepository.findOne(id);
	}
}