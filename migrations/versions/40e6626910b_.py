"""empty message

Revision ID: 40e6626910b
Revises: 3291788d2a4f
Create Date: 2015-10-24 11:08:22.473583

"""

# revision identifiers, used by Alembic.
revision = '40e6626910b'
down_revision = '3291788d2a4f'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('duty_station',
    sa.Column('airport_code', sa.Text(), nullable=False),
    sa.Column('name', sa.Text(), nullable=False),
    sa.Column('latitude', sa.Float(), nullable=False),
    sa.Column('longitude', sa.Float(), nullable=False),
    sa.Column('timezone', sa.Text(), nullable=False),
    sa.PrimaryKeyConstraint('airport_code')
    )
    op.create_table('team',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.Text(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('author', sa.Column('duty_station', sa.String(), nullable=True))
    op.add_column('author', sa.Column('pronouns', sa.String(), nullable=True))
    op.add_column('author', sa.Column('team', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'author', 'duty_station', ['duty_station'], ['airport_code'])
    op.create_foreign_key(None, 'author', 'team', ['team'], ['id'])
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'author', type_='foreignkey')
    op.drop_constraint(None, 'author', type_='foreignkey')
    op.drop_column('author', 'team')
    op.drop_column('author', 'pronouns')
    op.drop_column('author', 'duty_station')
    op.drop_table('team')
    op.drop_table('duty_station')
    ### end Alembic commands ###
