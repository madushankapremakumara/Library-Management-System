function MemberManagement() {
  const members = [
    { id: 1, name: 'Kasun Perera', email: 'kasun@example.com', joined: '2025-01-10', role: 'Member' },
    { id: 2, name: 'Anjali Silva', email: 'anjali@example.com', joined: '2025-02-15', role: 'Member' },
    { id: 3, name: 'Library Admin', email: 'admin@library.com', joined: '2024-11-20', role: 'Librarian' },
  ]
 
  return (
    <div className="lms-member-mgmt">
      <h3 className="lms-admin-sec-title" style={{ marginBottom: '1.5rem' }}>Member Registry</h3>
      <div className="lms-admin-table-container">
        <table className="lms-admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Joined Date</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.id}>
                <td style={{ fontWeight: '600' }}>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.joined}</td>
                <td>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    padding: '0.2rem 0.5rem', 
                    borderRadius: '4px',
                    background: member.role === 'Librarian' ? '#eff6ff' : '#f3f4f6',
                    color: member.role === 'Librarian' ? '#1d4ed8' : '#374151',
                    fontWeight: '600'
                  }}>
                    {member.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
 
export default MemberManagement
