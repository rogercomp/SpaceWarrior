
//nave.js ...........................................................

var Nave = (function()
{
	//exposed methods:

	var create = function(x, y, ref)
	{
		var obj = Object.create(def);
		obj.ref = ref;
		obj.angle = 0;
		obj.pos = Vec2D.create(x, y);
		obj.vel = Vec2D.create(0, 0);
		obj.thrust = Vec2D.create(0, 0);
		obj.idle = false;
		obj.radius = 8;
		obj.idleDelay = 0;

		return obj;
	};

	//Definição atributos da nave:

	var def =
	{
		angle: null,
		pos: null,
		vel: null,
		thrust: null,
		ref: null,
		tiroDelay: null,
		idle: null,
		radius: null,

		atualiza: function()
		{
			this.vel.add(this.thrust);
			this.pos.add(this.vel);

			if(this.vel.getLength() > 5) this.vel.setLength(5);

			++this.tiroDelay;

			if(this.idle)
			{
				if(++this.idleDelay > 120)
				{
					this.idleDelay = 0;
					this.idle = false;

					this.ref.reiniciarJogo();
				}
			}
		},

		tiro: function()
		{
			if(this.tiroDelay > 8)
			{
				this.ref.gerarTiro();
				this.tiroDelay = 0;
			}
		}
	};

	return {create:create};
}());