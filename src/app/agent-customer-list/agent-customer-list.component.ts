import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { TemporaryDataService } from '../services/temporary-data.service';
import { AgentService } from '../services/agent.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-agent-customer-list',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './agent-customer-list.component.html',
  styleUrl: './agent-customer-list.component.css'
})
export class AgentCustomerListComponent {
  customers: Array<any>;
  //agents:Array<any>;
  page: number = 1;
  totalRecords:number=0
  userRole:string=''
  agentData: Array<any>;
  selectedItemsPerPage: number = 5; // Set a default value, or fetch it from user preferences
  constructor(
    private customerService: CustomerService, 
    private router: Router,
    private dataService:DataService,
    private temporaryData:TemporaryDataService,
    private agentService: AgentService) 
  { 
   
    this.agentData=new Array<any>()
    this.customers=new Array<any>()
    this.userRole=temporaryData.getRole()
    console.log(this.userRole)}

  ngOnInit(): void {
    var token=localStorage.getItem('token')
    
    var role = this.userRole
    if(token==null){
      alert('Please login')
      this.router.navigateByUrl('/login')
    }
    else if(role!='Agent'){
      alert('Please Login As Agent')
      this.router.navigateByUrl('/login')
    }
    //debugger
    this.agentService.getAllAgents().subscribe({
      next:(response)=>{
        this.agentData=response
       
        
      },
      error(errorResponse:HttpErrorResponse){
        console.log(errorResponse)
      }
    })
    this.fetchCustomers();
  }

  fetchCustomers(): void {
    debugger
    this.customerService.getAllCustomers().subscribe(
      {
        next:(data)=>{
        this.customers=data
        console.log(this.customers)
        this.totalRecords=data.length
        this.filterCustomer();
      },
      error:(errorResponse:HttpErrorResponse)=>{
        console.log(errorResponse); 
      }
    }
    );
  }

  addCustomer(): void {
    this.router.navigateByUrl("/add-customer")
  }

  // editCustomer(customerId: number): void {
  //   // Navigate to the update agent page with the agent ID
  //   this.router.navigate(['/update-customer', customerId]);
 // }
 editCustomer(customerId: number): void {
  if (!isNaN(customerId)) {
    // Navigate to the update customer page with the customer ID
    this.router.navigate(['/update-customer', customerId]);
  } else {
    console.error('Invalid customer ID:', customerId);
    // Handle the case where customerId is not a valid number
  }
}


deleteCustomer(customerId: number): void {
  // Implement the logic to delete the agent using the agent service
  // For example:
  this.customerService.deleteCustomer(customerId).subscribe(
    () => {
      // Update the agents list after successful deletion
      this.fetchCustomers();
    },
    error => {
      console.error('Error deleting agent:', error);
    }
  );
}
filterCustomer(){
  var agent=this.agentData.find((a: any) => a.userId === this.dataService.userId)
  if((this.dataService.roleName=="Agent")){
    this.customers=this.customers.filter(x=>x.agentId === agent.agentId)
    console.log('jdsc' + this.customers)
  }
}

getAgentName(agentId: number): string {
  if (this.agentData) {
    const agent = this.agentData.find((a: any) => a.agentId === agentId);
    console.log(agent);
    return agent!=null ? `${agent.firstName} ${agent.lastName}` : 'Customer Not Found';
  } else {
    return 'Customer Data Not Loaded';
  }
}

onItemsPerPageChange(): void {
  this.page = 1; // Reset to the first page when items per page changes
  this.fetchCustomers(); // Fetch data with the new items per page
}
}

